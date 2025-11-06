# 如何切换成管理员账户

## 重要说明

⚠️ **管理员账户是在合约部署时设置的，无法更改。**

如果你当前连接的账户不是管理员，你需要：
1. **切换到部署合约时使用的账户**（在 MetaMask 中切换）
2. 或者**重新部署合约**，使用你想作为管理员的账户

## 方法 1：在 MetaMask 中切换账户（推荐）

### 步骤 1：确认管理员地址

**在页面上查看：**
1. 连接钱包后，查看页面顶部连接状态区域
2. 你会看到 "Admin: 0x..." 显示的管理员地址
3. 记住这个地址

**或者通过部署日志：**
- 查看部署时使用的账户地址

### 步骤 2：在 MetaMask 中切换账户

#### 方法 A：选择已有账户

1. **打开 MetaMask 扩展**
2. **点击账户名称**（顶部显示当前账户的地方）
3. **选择管理员账户**
   - 如果你的 MetaMask 中有多个账户，选择与管理员地址匹配的那个
   - 或者点击 "添加账户" 导入管理员账户

#### 方法 B：导入管理员账户（如果不在 MetaMask 中）

**如果你知道管理员账户的私钥：**

1. **打开 MetaMask**
2. **点击账户图标**（右上角）
3. **选择 "导入账户"**
4. **选择 "私钥"**
5. **粘贴管理员账户的私钥**
6. **点击 "导入"**

**如果你使用 Hardhat 本地节点：**

Hardhat 节点提供的账户私钥可以从节点启动日志中获取：

```powershell
# 启动 Hardhat 节点
npx hardhat node

# 输出示例：
# Account #0: 0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266 (10000 ETH)
# Private Key: 0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80
```

**导入步骤：**
1. 复制 Account #0 的私钥（通常是 `0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80`）
2. 在 MetaMask 中选择 "导入账户"
3. 粘贴私钥
4. 导入后，这个账户就是管理员账户

### 步骤 3：刷新页面

切换账户后：
1. **刷新浏览器页面**（Ctrl+F5）
2. **确认页面显示 "✓ You are admin"**
3. 现在你可以使用管理员功能了

## 方法 2：重新部署合约（如果无法访问原管理员账户）

如果你无法访问原管理员账户，可以重新部署合约来设置新的管理员。

### 步骤 1：切换到你想作为管理员的账户

在 MetaMask 中切换到你想作为管理员的账户。

### 步骤 2：重新部署合约

**对于本地开发：**
```powershell
cd E:\Spring\Zama\Vote
npx hardhat deploy --network localhost
```

**对于 Sepolia 测试网：**
```powershell
cd E:\Spring\Zama\Vote
npx hardhat deploy --network sepolia
```

### 步骤 3：更新前端配置

如果合约地址改变了，需要更新 `deployedContracts.ts`：

1. 查看部署输出中的新合约地址
2. 更新 `Vote/ui/packages/nextjs/contracts/deployedContracts.ts` 中的地址

### 步骤 4：刷新页面

刷新浏览器页面，现在你连接的账户就是管理员了。

⚠️ **注意：重新部署会创建新的合约，旧合约的数据会丢失。**

## 常见场景

### 场景 1：本地开发（Hardhat 节点）

**默认管理员账户：**
- Account #0: `0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266`
- 私钥：`0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80`

**切换到管理员：**

1. **在 MetaMask 中导入账户：**
   - 点击 MetaMask 账户图标
   - 选择 "导入账户"
   - 选择 "私钥"
   - 粘贴：`0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80`
   - 点击 "导入"

2. **刷新页面**

3. **确认：**
   - 页面显示 "✓ You are admin"
   - 可以看到 "Admin Controls" 区域

### 场景 2：Sepolia 测试网

**管理员账户：**
- 部署合约时使用的账户（从 MetaMask 或 `SEPOLIA_PRIVATE_KEY` 配置）

**切换到管理员：**

1. **查看部署日志确定管理员地址**
2. **在 MetaMask 中切换到该账户**
3. **刷新页面**

如果账户不在 MetaMask 中：
1. 如果有私钥，导入账户
2. 如果没有私钥，需要重新部署合约

## 验证是否切换成功

### 检查清单

✅ **切换到管理员后，你应该看到：**

1. [ ] 页面顶部显示 "✓ You are admin" 标签
2. [ ] 打开投票详情页面后，底部有 "Admin Controls" 区域（黄色背景）
3. [ ] "Admin Controls" 中有 "🔓 Allow Decrypt Option X" 按钮
4. [ ] "Admin Controls" 中有 "🔓 Decrypt Results" 按钮

### 如果仍然看不到管理员功能

**检查：**

1. **账户是否正确切换**
   - 在 MetaMask 中确认当前账户
   - 对比页面显示的 "Admin:" 地址

2. **网络是否匹配**
   - 确保 MetaMask 连接到正确的网络（localhost 或 Sepolia）
   - 确保网络与合约部署的网络一致

3. **页面是否刷新**
   - 强制刷新页面（Ctrl+F5）
   - 清除浏览器缓存

4. **合约是否已部署**
   - 确认合约已部署到当前网络
   - 检查页面是否显示合约地址

## 快速切换步骤（本地开发）

**最简单的方法（Hardhat 本地节点）：**

1. **获取管理员账户私钥**
   ```
   默认私钥：0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80
   ```

2. **在 MetaMask 中导入**
   - 账户图标 → 导入账户 → 私钥
   - 粘贴上面的私钥
   - 导入

3. **刷新页面**
   - Ctrl+F5 强制刷新

4. **确认**
   - 查看是否显示 "✓ You are admin"
   - 打开投票详情，查看是否有 "Admin Controls"

## 总结

**切换管理员账户的步骤：**

1. **确认管理员地址**（在页面上查看）
2. **在 MetaMask 中切换到该账户**
   - 如果账户在 MetaMask 中：直接选择
   - 如果不在：导入账户（使用私钥）
3. **刷新页面**
4. **验证：** 查看是否显示 "✓ You are admin"

**如果无法访问原管理员账户：**
- 重新部署合约，使用新的管理员账户
- 注意：这会创建新合约，旧数据会丢失

