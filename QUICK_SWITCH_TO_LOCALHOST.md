# 快速切换到 Localhost 指南

## 当前问题
Sepolia 的 FHEVM Relayer 服务暂时不可用。错误信息已明确提示切换到 localhost。

## 快速切换步骤（3 步）

### 步骤 1：启动 Hardhat 节点

**打开新的 PowerShell 终端窗口：**

```powershell
cd E:\Spring\Zama\Vote
npx hardhat node
```

**⚠️ 重要：保持这个终端窗口打开！**

**预期输出：**
```
Started HTTP and WebSocket server on http://127.0.0.1:8545/

Accounts:
Account #0: 0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266 (10000 ETH)
...
```

### 步骤 2：部署合约到 Localhost

**打开另一个 PowerShell 终端窗口：**

```powershell
cd E:\Spring\Zama\Vote
npx hardhat deploy --network localhost
```

**预期输出：**
```
deploying "Voting" (tx: 0x...) ... deployed at 0x9fE46736679d2D9a65F0992F2272dE9f3c7fa6e0
```

### 步骤 3：在 MetaMask 中切换网络

1. **打开 MetaMask** 浏览器扩展
2. **点击网络选择器**（顶部显示当前网络的地方）
3. **选择 "Hardhat Local"** 网络

**如果还没有添加 Hardhat Local 网络：**

1. 点击"添加网络"或"手动添加网络"
2. 填写以下信息：

```
网络名称: Hardhat Local
新增 RPC URL: http://127.0.0.1:8545
链 ID: 31337
货币符号: ETH
区块浏览器 URL: (留空)
```

3. 点击"保存"

### 步骤 4：刷新浏览器页面

按 `Ctrl + F5` 强制刷新页面，现在应该可以正常使用了！

## 验证切换成功

切换成功后，你应该看到：

1. ✅ **连接状态**：连接状态指示器显示 "Connected to Hardhat Local"
2. ✅ **合约地址**：显示 localhost 上的合约地址（以 `0x9fE...` 开头）
3. ✅ **可以创建投票**：不再出现 relayer 错误

## 完整启动流程总结

**需要 3 个终端窗口：**

### 终端 1：Hardhat 节点（必须持续运行）
```powershell
cd E:\Spring\Zama\Vote
npx hardhat node
```

### 终端 2：部署合约（一次性）
```powershell
cd E:\Spring\Zama\Vote
npx hardhat deploy --network localhost
```

### 终端 3：前端开发服务器（如果还没有运行）
```powershell
cd E:\Spring\Zama\Vote\ui\packages\nextjs
pnpm dev
```

## 常见问题

### Q: 节点启动失败，端口被占用？

**检查端口占用：**
```powershell
netstat -ano | findstr :8545
```

**结束占用进程（替换 xxxxx 为实际的 PID）：**
```powershell
taskkill /PID xxxxx /F
```

### Q: 部署合约时找不到合约？

**确保在正确的目录：**
```powershell
cd E:\Spring\Zama\Vote
```

### Q: MetaMask 无法连接到 Hardhat Local？

**检查：**
1. Hardhat 节点是否正在运行（终端 1）
2. RPC URL 是否正确：`http://127.0.0.1:8545`
3. Chain ID 是否正确：`31337`

### Q: 刷新后还是显示 Sepolia？

**手动切换：**
1. 打开 MetaMask
2. 点击网络选择器
3. 选择 "Hardhat Local"（Chain ID: 31337）

## 为什么使用 Localhost？

✅ **优势：**
- 不依赖外部服务（Sepolia relayer）
- 交易立即确认
- 免费（不需要真实的测试网 ETH）
- 完全控制环境
- 可以随时重置

⚠️ **限制：**
- 只在你本地可用
- 需要保持 Hardhat 节点运行

## 切换回 Sepolia（当服务恢复时）

当 Sepolia relayer 服务恢复后：

1. 在 MetaMask 中选择 Sepolia 网络
2. 刷新浏览器页面
3. 确保合约已部署（地址：`0x0f232c6229D32CbB9C944b575e4fe70F89E4809d`）

## 需要帮助？

如果切换后仍有问题，请检查：
1. Hardhat 节点是否正在运行
2. 合约是否已部署到 localhost
3. MetaMask 是否连接到正确的网络
4. 浏览器控制台是否有其他错误

