# 解密功能使用指南

## 解密功能位置

解密功能位于**投票详情页面**中，当你选择一个投票后，在页面底部可以看到。

## 如何访问解密功能

### 步骤 1：确保你是管理员

解密功能**只有管理员可以使用**。管理员是部署合约时设置的地址（默认是部署者的地址）。

**检查你是否是管理员：**
1. 创建投票时使用的账户就是管理员账户
2. 页面会自动检测你的账户是否是管理员
3. 如果是管理员，你会看到 "Admin Controls" 区域

### 步骤 2：选择一个投票

1. 在 "Active Polls" 列表中，点击任意一个投票卡片
2. 或者点击卡片上的 "View →" 按钮
3. 投票详情页面会展开

### 步骤 3：查看解密功能

在投票详情页面的底部，你会看到：

1. **"Encrypted Vote Counts"（加密投票计数）** 部分
   - 显示每个选项的加密状态
   - 如果已解密，会显示具体的票数（如 "5 votes ✅"）
   - 如果未解密，会显示 "🔒 Encrypted"

2. **"Admin Controls"（管理员控制）** 部分（仅管理员可见）
   - 🔓 **"Allow Decrypt Option X"** 按钮 - 为每个选项授权解密
   - 🔓 **"Decrypt Results"** 按钮 - 执行解密操作

## 解密流程

### 流程说明

解密需要**两个步骤**：

#### 步骤 1：授权解密（Allow Decrypt）

1. 对于每个投票选项，点击对应的 **"🔓 Allow Decrypt Option X"** 按钮
2. 这会调用合约的 `allowAdminToDecrypt` 函数
3. 需要确认 MetaMask 交易
4. 等待交易确认

**注意：** 你需要为**每个选项**都授权解密，才能解密该选项的投票结果。

#### 步骤 2：执行解密（Decrypt）

1. 在所有需要的选项都授权解密后
2. 点击 **"🔓 Decrypt Results"** 按钮
3. 这会使用 FHEVM SDK 解密加密的投票计数
4. 解密结果会显示在 "Encrypted Vote Counts" 部分

**注意：** 
- "Decrypt Results" 按钮只有在至少一个选项已授权解密后才会启用
- 解密可能需要几秒钟时间，请耐心等待

## 页面布局说明

```
投票详情页面
├── 投票标题和描述
├── 投票区域（如果还没投票）
├── Poll Statistics（投票统计）
│   ├── Total Votes（总票数）
│   ├── Options（选项数）
│   └── Status（状态）
├── Encrypted Vote Counts（加密投票计数）⭐ 解密结果显示在这里
│   ├── Option 1: 🔒 Encrypted 或 5 votes ✅
│   ├── Option 2: 🔒 Encrypted 或 3 votes ✅
│   └── ...
└── Admin Controls（管理员控制）⭐ 解密功能在这里
    ├── 🔓 Allow Decrypt Option 1
    ├── 🔓 Allow Decrypt Option 2
    ├── ...
    └── 🔓 Decrypt Results
```

## 示例使用流程

### 示例：解密投票结果

1. **打开投票详情**
   - 在 "Active Polls" 列表中选择一个投票

2. **授权解密所有选项**
   - 点击 "🔓 Allow Decrypt Option 1"
   - 确认 MetaMask 交易
   - 点击 "🔓 Allow Decrypt Option 2"
   - 确认 MetaMask 交易
   - ...（为所有选项重复）

3. **执行解密**
   - 点击 "🔓 Decrypt Results"
   - 等待解密完成（几秒钟）

4. **查看结果**
   - 在 "Encrypted Vote Counts" 部分
   - 每个选项现在显示具体的票数（如 "5 votes ✅"）

## 常见问题

### Q: 为什么我看不到 "Admin Controls"？

**A:** 只有管理员账户才能看到解密功能。确保你使用的是部署合约时使用的账户。

### Q: "Decrypt Results" 按钮是灰色的？

**A:** 你需要先为至少一个选项授权解密（点击 "Allow Decrypt Option X"）。

### Q: 解密需要多长时间？

**A:** 通常几秒钟。如果超过 30 秒，请检查浏览器控制台是否有错误。

### Q: 解密后能看到什么？

**A:** 在 "Encrypted Vote Counts" 部分，每个选项会显示具体的票数，例如：
- `5 votes ✅` - 表示该选项获得了 5 票
- `🔒 Encrypted` - 表示该选项还未解密

### Q: 非管理员可以查看解密结果吗？

**A:** 可以。一旦管理员解密了结果，所有人（包括非管理员）都可以在 "Encrypted Vote Counts" 部分看到解密后的票数。

### Q: 我需要为每个投票都执行解密吗？

**A:** 是的。每个投票的解密是独立的，需要分别为每个投票执行解密流程。

## 技术说明

### 解密流程的技术细节

1. **授权解密（allowAdminToDecrypt）**
   - 调用智能合约的 `allowAdminToDecrypt(pollId, optionIndex)` 函数
   - 在合约中设置解密权限，允许管理员解密特定的加密数据

2. **执行解密（decrypt）**
   - 使用 FHEVM SDK 的 `useFHEDecrypt` hook
   - 从链上获取加密的投票计数（handle）
   - 使用 FHEVM 实例解密这些 handle
   - 将解密结果存储在状态中并显示在 UI 上

### 为什么需要两步？

这是 FHEVM 的安全机制：
- **第一步（授权）**：在链上设置权限，确保只有被授权的管理员可以解密
- **第二步（解密）**：在客户端使用 FHEVM SDK 实际执行解密操作

这种设计确保了：
- ✅ 解密权限由智能合约控制
- ✅ 实际的解密操作在客户端完成，不会暴露私钥
- ✅ 只有授权的人才能解密数据

## 注意事项

⚠️ **重要提示：**

1. **只有管理员可以授权解密**
   - 确保你使用的是部署合约时的账户
   - 检查 MetaMask 中当前连接的账户

2. **需要先关闭投票才能解密**
   - 根据合约设计，投票必须处于非活跃状态才能解密
   - 如果投票还是活跃状态，需要先调用 `deactivatePoll`（这个功能目前在前端还没有实现）

3. **解密是永久性的**
   - 一旦解密，结果会显示在页面上
   - 任何人都可以看到解密后的结果

4. **每个选项需要单独授权**
   - 如果你有 3 个选项，需要点击 3 次 "Allow Decrypt Option X"
   - 然后再点击一次 "Decrypt Results" 来解密所有已授权的选项

## 快速参考

```
解密投票结果的步骤：

1. 选择一个投票（点击投票卡片）
2. 滚动到页面底部
3. 找到 "Admin Controls" 区域（黄色背景）
4. 点击每个选项的 "🔓 Allow Decrypt Option X" 按钮
5. 确认 MetaMask 交易（每个选项都需要）
6. 点击 "🔓 Decrypt Results" 按钮
7. 等待解密完成
8. 查看 "Encrypted Vote Counts" 部分的结果
```

