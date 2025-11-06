# Sepolia Relayer 问题解决方案

## 问题描述

在使用 Sepolia 测试网时，遇到以下错误：
```
FHEVM Relayer connection failed: Relayer didn't response correctly. 
Bad status . Content: {"message":"Transaction rejected: \"Input request failed: 
Transaction failed: Transaction failed: Failed to check contract code: 
backend connection task has stopped\""}
```

## 问题原因

这个错误通常表示：
1. **Sepolia 的公共 Relayer 服务暂时不可用**：Zama 提供的公共 relayer 服务可能遇到临时问题
2. **网络连接问题**：无法连接到 relayer 服务
3. **合约验证失败**：Relayer 无法验证合约代码

## 推荐解决方案：使用 Localhost 进行测试

**对于开发和测试，强烈建议使用 localhost 而不是 Sepolia**，因为：

1. ✅ **更可靠**：本地 Hardhat 节点带有 FHEVM 支持，不依赖外部服务
2. ✅ **更快速**：本地交易立即确认
3. ✅ **免费**：不需要真实的 Sepolia ETH
4. ✅ **完全控制**：可以随时重置和重新部署

### 切换到 Localhost 的步骤

#### 1. 启动 Hardhat 节点

**打开新的终端窗口：**

```powershell
cd E:\Spring\Zama\Vote
npx hardhat node
```

**⚠️ 保持这个终端窗口打开！**

#### 2. 部署合约到 Localhost

**打开另一个终端窗口：**

```powershell
cd E:\Spring\Zama\Vote
npx hardhat deploy --network localhost
```

**预期输出：**
```
deploying "Voting" (tx: 0x...) ... deployed at 0x9fE46736679d2D9a65F0992F2272dE9f3c7fa6e0
```

#### 3. 配置 MetaMask

1. 打开 MetaMask
2. 点击网络选择器（顶部）
3. 点击"添加网络"或"手动添加网络"
4. 填写以下信息：

```
网络名称: Hardhat Local
新增 RPC URL: http://127.0.0.1:8545
链 ID: 31337
货币符号: ETH
区块浏览器 URL: (留空)
```

5. 点击"保存"

#### 4. 切换到 Localhost 网络

在 MetaMask 中选择"Hardhat Local"网络（Chain ID: 31337）

#### 5. 刷新浏览器页面

刷新页面后，应该能正常使用所有功能。

## 如果必须使用 Sepolia

如果确实需要在 Sepolia 上测试，可以尝试：

### 1. 检查网络连接

确保可以访问互联网，并且没有防火墙阻止连接。

### 2. 等待服务恢复

Sepolia 的 relayer 服务可能只是暂时不可用，稍后重试可能就能正常工作。

### 3. 检查合约部署

确保合约已正确部署：
```powershell
cd E:\Spring\Zama\Vote
Get-Content deployments\sepolia\Voting.json | ConvertFrom-Json | Select-Object address
```

应该看到地址：`0x0f232c6229D32CbB9C944b575e4fe70F89E4809d`

### 4. 在区块浏览器验证

在 Sepolia 区块浏览器（如 https://sepolia.etherscan.io/）中查看合约地址，确认合约已部署。

### 5. 检查浏览器控制台

查看是否有其他错误信息，可能会提供更多线索。

## 验证 Localhost 设置

### 检查节点是否运行

```powershell
netstat -ano | findstr :8545
```

应该看到：
```
TCP    127.0.0.1:8545         0.0.0.0:0              LISTENING       xxxxx
```

### 检查合约是否部署

```powershell
cd E:\Spring\Zama\Vote
Get-Content deployments\localhost\Voting.json | ConvertFrom-Json | Select-Object address
```

应该看到地址：`0x9fE46736679d2D9a65F0992F2272dE9f3c7fa6e0`

## 完整测试流程（Localhost）

1. **终端 1：启动节点**
   ```powershell
   cd E:\Spring\Zama\Vote
   npx hardhat node
   ```
   ⚠️ 保持运行！

2. **终端 2：部署合约**
   ```powershell
   cd E:\Spring\Zama\Vote
   npx hardhat deploy --network localhost
   ```

3. **终端 3：启动前端**
   ```powershell
   cd E:\Spring\Zama\Vote\ui\packages\nextjs
   pnpm dev
   ```

4. **浏览器：**
   - 打开 http://localhost:3000
   - 连接 MetaMask
   - 切换到 "Hardhat Local" 网络（Chain ID: 31337）
   - 测试创建投票和投票功能

## 总结

- ✅ **推荐**：使用 localhost 进行开发和测试
- ⚠️ **Sepolia**：如果 relayer 服务不可用，等待服务恢复或使用 localhost
- 🔍 **调试**：检查浏览器控制台和网络请求以获取更多信息

