# FHEVM Relayer 错误解决方案

## 错误信息
```
Relayer didn't response correctly. Bad status . Content: {"message":"Transaction rejected: \"Input request failed: Transaction failed: Transaction failed: Failed to check contract code: backend connection task has stopped\""}
```

## 问题原因

这个错误通常发生在以下情况：
1. **本地开发**：Hardhat 节点没有正确启动或 FHEVM 支持未启用
2. **Sepolia 测试网**：FHEVM Relayer 服务连接问题

## 解决方案

### 方案 1：本地开发（Localhost - Chain ID 31337）

#### 1.1 确保使用正确的 Hardhat 节点

**重要：** 必须使用带有 FHEVM 支持的 Hardhat 节点！

```powershell
cd E:\Spring\Zama\Vote
npx hardhat node
```

**预期输出应该包含：**
```
Started HTTP and WebSocket server on http://127.0.0.1:8545/
```

#### 1.2 检查 Hardhat 配置

确保 `hardhat.config.ts` 中包含了 `@fhevm/hardhat-plugin`：

```typescript
import "@fhevm/hardhat-plugin";
```

#### 1.3 验证节点是否支持 FHEVM

节点启动后，应该能看到 FHEVM 相关的日志。如果看到错误，可能需要：
- 检查 `@fhevm/hardhat-plugin` 是否正确安装
- 重新安装依赖：`npm install` 或 `pnpm install`

#### 1.4 检查前端配置

确保 `Vote/ui/packages/nextjs/app/_components/VotingApp.tsx` 中有：

```typescript
const initialMockChains = { 31337: "http://localhost:8545" };
```

### 方案 2：Sepolia 测试网（Chain ID 11155111）

#### 2.1 Relayer 服务状态

Sepolia 使用 Zama 提供的公共 relayer 服务。如果遇到连接问题：

1. **检查网络连接**：确保可以访问互联网
2. **检查 relayer 服务状态**：可能是临时服务中断
3. **重试**：稍后重试，服务可能已恢复

#### 2.2 检查 FHEVM SDK 配置

确保 FHEVM SDK 正确加载了 Sepolia 配置。检查浏览器控制台是否有 SDK 加载错误。

#### 2.3 验证合约部署

确保合约已正确部署到 Sepolia：
```powershell
cd E:\Spring\Zama\Vote
npx hardhat deploy --network sepolia
```

检查部署文件：
```powershell
Get-Content deployments\sepolia\Voting.json | ConvertFrom-Json | Select-Object address
```

### 方案 3：常见问题排查

#### 问题 1：本地节点未启动

**症状：** `fetchError: Failed to fetch` 或 relayer 连接错误

**解决：**
1. 检查节点是否运行：`netstat -ano | findstr :8545`
2. 如果没有，启动节点：`npx hardhat node`
3. 确保节点持续运行（不要关闭终端窗口）

#### 问题 2：端口冲突

**症状：** `Error: listen EADDRINUSE: address already in use :::8545`

**解决：**
```powershell
# 查找占用端口的进程
netstat -ano | findstr :8545

# 结束进程（替换 xxxxx 为实际的 PID）
taskkill /PID xxxxx /F
```

#### 问题 3：FHEVM 插件未正确加载

**症状：** 加密操作失败，找不到 relayer metadata

**解决：**
1. 检查 `hardhat.config.ts` 是否包含 `@fhevm/hardhat-plugin`
2. 重新安装依赖：`npm install` 或 `pnpm install`
3. 重启 Hardhat 节点

#### 问题 4：MetaMask 网络配置错误

**症状：** 连接错误或无法发送交易

**解决：**
- **Localhost：**
  - RPC URL: `http://127.0.0.1:8545`
  - Chain ID: `31337`
- **Sepolia：**
  - 使用 MetaMask 默认的 Sepolia 网络配置

### 方案 4：测试 Relayer 连接

#### 在浏览器控制台测试：

```javascript
// 检查 FHEVM 实例状态
console.log("FHEVM instance:", window.relayerSDK);

// 检查当前网络
const chainId = await window.ethereum.request({ method: "eth_chainId" });
console.log("Chain ID:", parseInt(chainId, 16));

// 对于 localhost，应该看到 mock relayer 相关信息
// 对于 Sepolia，应该看到 SepoliaConfig
```

### 方案 5：完整启动流程

#### 本地开发（Localhost）：

1. **终端 1：启动 Hardhat 节点**
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
   - 切换到 Hardhat Local 网络（Chain ID: 31337）

#### Sepolia 测试网：

1. **部署合约**
   ```powershell
   cd E:\Spring\Zama\Vote
   npx hardhat deploy --network sepolia
   ```

2. **启动前端**
   ```powershell
   cd E:\Spring\Zama\Vote\ui\packages\nextjs
   pnpm dev
   ```

3. **浏览器：**
   - 打开 http://localhost:3000
   - 连接 MetaMask
   - 切换到 Sepolia 测试网（Chain ID: 11155111）

### 如果仍然无法解决

1. **检查浏览器控制台**：查看完整的错误信息
2. **检查网络请求**：在浏览器开发者工具的 Network 标签中查看失败的请求
3. **检查 Hardhat 节点日志**：查看是否有相关错误信息
4. **重启所有服务**：关闭所有终端和浏览器，然后按照正确顺序重新启动

### 联系支持

如果以上步骤都无法解决问题，请提供：
- 完整的浏览器控制台错误信息
- Hardhat 节点的输出日志
- 当前使用的网络（localhost 或 Sepolia）
- MetaMask 网络配置截图

