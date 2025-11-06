# 修复解密时的 missing revert data 错误

## 🔴 错误信息

```
missing revert data (action="estimateGas", data=null, reason=null, transaction={...}, code=CALL_EXCEPTION)
```

## 🔍 问题原因

这个错误通常发生在调用 `allowAdminToDecrypt` 时，可能的原因：

1. **选项未初始化** - 该选项还没有任何投票，`option.initialized` 为 `false`
2. **无效的 optionIndex** - `optionIndex` 超出范围
3. **无效的 pollId** - 投票不存在
4. **权限问题** - 不是管理员账户
5. **合约状态问题** - 合约数据未正确加载

## 🔧 解决方案

### 方案 1: 检查选项是否已初始化

**问题**: 如果选项还没有任何投票，`option.initialized` 会是 `false`，导致 `require(option.initialized, "Option not initialized")` 失败。

**解决方法**:
1. **先让用户投票** - 确保至少有一个用户对该选项投票
2. **然后再尝试解密**

**检查方法**:
- 查看 "Encrypted Vote Counts" 部分
- 如果显示 "0 votes" 或 handle 为空，说明该选项还没有投票

### 方案 2: 检查参数是否正确

**检查 pollId**:
- 确认 `selectedPollId` 是正确的投票 ID
- 确认投票存在（不是 `undefined`）

**检查 optionIndex**:
- 确认 `optionIndex` 在有效范围内（0 到 `optionCount - 1`）
- 确认选项索引从 0 开始

### 方案 3: 添加更好的错误处理

在调用 `allowAdminToDecrypt` 前，先检查：
1. 选项是否已初始化
2. 参数是否有效
3. 是否是管理员

### 方案 4: 检查合约状态

**问题**: 合约可能没有正确加载投票数据。

**解决方法**:
1. **刷新页面**
2. **重新选择投票**
3. **等待数据加载完成**

## 🛠️ 代码修复

### 修复 allowAdminToDecrypt 函数

添加更详细的错误检查和提示：

```typescript
const allowAdminToDecrypt = useCallback(async (pollId: number, optionIndex: number) => {
  if (!isAdmin) {
    setMessage("❌ Only admin can allow decryption");
    return;
  }
  if (isProcessing) return;
  
  // 检查参数
  if (pollId === undefined || optionIndex === undefined) {
    setMessage("❌ Invalid poll ID or option index");
    return;
  }
  
  // 检查选项是否在有效范围内
  if (pollInfo && optionIndex >= pollInfo.optionCount) {
    setMessage(`❌ Invalid option index. Valid range: 0-${pollInfo.optionCount - 1}`);
    return;
  }
  
  setIsProcessing(true);
  try {
    const write = getContract("write");
    if (!write) {
      setMessage("❌ Contract or signer not available");
      setIsProcessing(false);
      return;
    }
    
    // 先尝试读取选项数据，检查是否已初始化
    try {
      const read = getContract("read");
      if (read) {
        const handle = await read.getEncryptedVoteCount(BigInt(pollId), optionIndex);
        if (!handle || handle === "0x0000000000000000000000000000000000000000000000000000000000000000") {
          setMessage(`❌ Option ${optionIndex + 1} has no votes yet. Please wait for users to vote first.`);
          setIsProcessing(false);
          return;
        }
      }
    } catch (readError) {
      console.warn("Could not check option status:", readError);
    }
    
    setMessage(`Authorizing decryption for option ${optionIndex + 1}...`);
    
    // 使用 estimateGas 先检查交易是否会成功
    try {
      await write.allowAdminToDecrypt.estimateGas(BigInt(pollId), optionIndex);
    } catch (estimateError: any) {
      console.error("Gas estimation failed:", estimateError);
      if (estimateError?.reason) {
        setMessage(`❌ ${estimateError.reason}`);
      } else if (estimateError?.message) {
        setMessage(`❌ ${estimateError.message}`);
      } else {
        setMessage(`❌ Transaction would fail. Possible reasons: Option not initialized, invalid parameters, or not admin.`);
      }
      setIsProcessing(false);
      return;
    }
    
    const tx = await write.allowAdminToDecrypt(BigInt(pollId), optionIndex);
    setMessage("Waiting for transaction confirmation...");
    await tx.wait();
    setMessage(`✅ Option ${optionIndex + 1} decryption authorized. Please wait a moment, then click "Decrypt Results".`);
    
    // Wait a bit for the transaction to be processed
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Refresh contract data and reload encrypted counts
    await refreshContractData();
    await loadEncryptedCounts();
  } catch (e: any) {
    console.error("Allow decrypt error:", e);
    let errorMessage = "Unknown error";
    
    if (e?.reason) {
      errorMessage = e.reason;
    } else if (e?.message) {
      errorMessage = e.message;
    } else if (typeof e === "string") {
      errorMessage = e;
    }
    
    // 提供更友好的错误消息
    if (errorMessage.includes("Only admin")) {
      setMessage("❌ Only admin can authorize decryption. Please switch to admin account.");
    } else if (errorMessage.includes("Option not initialized")) {
      setMessage(`❌ Option ${optionIndex + 1} has no votes yet. Please wait for users to vote first.`);
    } else if (errorMessage.includes("Invalid option")) {
      setMessage(`❌ Invalid option index. Please check the option number.`);
    } else {
      setMessage(`❌ Authorization failed: ${errorMessage}`);
    }
  } finally {
    setIsProcessing(false);
  }
}, [isAdmin, isProcessing, pollInfo, getContract, refreshContractData, loadEncryptedCounts]);
```

## ✅ 快速检查清单

在尝试解密前，确认：

- [ ] **你是管理员** - 页面显示 "✓ You are admin"
- [ ] **投票已存在** - `selectedPollId` 不是 `undefined`
- [ ] **选项索引有效** - `optionIndex` 在 0 到 `optionCount - 1` 之间
- [ ] **选项已有投票** - 该选项至少有一个用户投票
- [ ] **合约数据已加载** - `pollInfo` 和 `encryptedCounts` 已加载

## 🎯 推荐操作流程

1. **确保有投票数据**:
   - 先让至少一个用户投票
   - 确认 "Encrypted Vote Counts" 显示有数据

2. **检查管理员状态**:
   - 确认页面显示 "✓ You are admin"
   - 确认当前账户是部署合约时的账户

3. **按顺序执行**:
   - 先点击 "🔓 Allow Decrypt Option X" 按钮
   - 等待交易确认
   - 然后再点击 "🔓 Decrypt Results"

4. **如果仍然失败**:
   - 刷新页面
   - 重新选择投票
   - 检查浏览器控制台的详细错误信息

## 🆘 如果还是失败

请提供：
1. **完整的错误信息**（从浏览器控制台复制）
2. **投票 ID** (`pollId`)
3. **选项索引** (`optionIndex`)
4. **是否有投票数据**（该选项是否有人投票）
5. **是否是管理员账户**

我可以根据具体错误提供更精确的解决方案。

