# 如何获取管理员地址

## 方法 1：在页面上查看（最简单）⭐

**步骤：**

1. **打开投票应用页面**
2. **连接钱包**
3. **查看页面顶部连接状态区域**

你会看到：
- **Contract:** 合约地址
- **Admin:** `0x...` ← **这就是管理员地址**
- 如果你的账户是管理员，会显示 "✓ You are admin"

**这是最简单、最直接的方法！**

---

## 方法 2：使用 Hardhat 任务

我已为你创建了一个 Hardhat 任务来查询管理员地址。

### 使用步骤

**对于本地开发：**
```powershell
cd E:\Spring\Zama\Vote
npx hardhat --network localhost task:admin
```

**对于 Sepolia 测试网：**
```powershell
cd E:\Spring\Zama\Vote
npx hardhat --network sepolia task:admin
```

### 输出示例

```
============================================================
Voting Contract Admin Address
============================================================
Contract Address: 0x9fE46736679d2D9a65F0992F2272dE9f3c7fa6e0
Admin Address:   0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266
============================================================
```

---

## 方法 3：查看部署日志

### 本地开发（Localhost）

**部署时的输出：**
```powershell
npx hardhat deploy --network localhost

# 输出示例：
# deploying "Voting" (tx: 0x...) ... deployed at 0x9fE46736679d2D9a65F0992F2272dE9f3c7fa6e0
# Voting contract:  0x9fE46736679d2D9a65F0992F2272dE9f3c7fa6e0
```

**部署时使用的账户就是管理员账户。**

**对于 Hardhat 节点，默认管理员是：**
- Account #0: `0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266`
- 私钥：`0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80`

### Sepolia 测试网

**部署时的输出：**
```powershell
npx hardhat deploy --network sepolia

# 输出示例：
# deploying "Voting" (tx: 0x...) ... deployed at 0x0f232c6229D32CbB9C944b575e4fe70F89E4809d
```

**部署时 MetaMask 弹出的账户就是管理员账户。**

**或查看配置：**
- 检查 `hardhat.config.ts` 中的 `SEPOLIA_PRIVATE_KEY` 配置
- 该私钥对应的地址就是管理员地址

---

## 方法 4：查看 Hardhat 节点输出的账户

如果你使用本地 Hardhat 节点，启动时会显示所有账户：

```powershell
npx hardhat node

# 输出示例：
# Account #0: 0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266 (10000 ETH)
# Account #1: 0x70997970C51812dc3A010C7d01b50e0d17dc79C8 (10000 ETH)
# ...
```

**默认情况下，Account #0 是部署者账户，也就是管理员账户。**

---

## 方法 5：通过浏览器控制台查询

打开浏览器开发者工具（F12），在控制台运行：

```javascript
// 方法 A: 通过合约直接查询（需要合约地址）
// 假设合约地址是已知的
const contractAddress = "0x9fE46736679d2D9a65F0992F2272dE9f3c7fa6e0"; // 替换为实际地址
const provider = new ethers.JsonRpcProvider("http://127.0.0.1:8545"); // 或 Sepolia RPC

// 调用合约的 admin() 函数
const contractABI = [
  "function admin() public view returns (address)"
];
const contract = new ethers.Contract(contractAddress, contractABI, provider);
const adminAddress = await contract.admin();
console.log("Admin Address:", adminAddress);

// 方法 B: 查看当前页面状态（如果已加载）
// 在 React DevTools 中查看 voting.admin
```

---

## 方法 6：查看部署文件

**本地开发：**
```powershell
# 查看部署信息
Get-Content deployments\localhost\Voting.json | ConvertFrom-Json | Select-Object address
```

部署文件包含合约地址，但管理员地址需要从合约中查询。

---

## 方法 7：在区块浏览器查看（Sepolia）

如果你部署到了 Sepolia 测试网：

1. **访问 Sepolia 区块浏览器：**
   ```
   https://sepolia.etherscan.io/address/0x0f232c6229D32CbB9C944b575e4fe70F89E4809d
   ```
   （替换为你的合约地址）

2. **查看合约的 Read Contract 部分**
3. **调用 `admin()` 函数查看管理员地址**

---

## 快速参考表

| 方法 | 难度 | 适用场景 | 推荐度 |
|------|------|----------|--------|
| 页面查看 | ⭐ 最简单 | 日常使用 | ⭐⭐⭐⭐⭐ |
| Hardhat 任务 | ⭐⭐ 简单 | 命令行查询 | ⭐⭐⭐⭐ |
| 部署日志 | ⭐⭐ 简单 | 部署时查看 | ⭐⭐⭐ |
| Hardhat 节点 | ⭐⭐ 简单 | 本地开发 | ⭐⭐⭐ |
| 浏览器控制台 | ⭐⭐⭐ 中等 | 调试 | ⭐⭐⭐ |
| 区块浏览器 | ⭐⭐ 简单 | Sepolia 测试网 | ⭐⭐⭐ |

---

## 最常见的场景

### 场景 1：本地开发（Hardhat 节点）

**默认管理员地址：**
```
0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266
```

**获取方法：**
1. ✅ **在页面上查看**（最简单）
2. ✅ **使用任务：** `npx hardhat --network localhost task:admin`
3. ✅ **查看 Hardhat 节点输出**（Account #0）

### 场景 2：Sepolia 测试网

**获取方法：**
1. ✅ **在页面上查看**（最简单）
2. ✅ **使用任务：** `npx hardhat --network sepolia task:admin`
3. ✅ **查看部署日志**（部署时使用的账户）
4. ✅ **在区块浏览器查看**

---

## 使用 Hardhat 任务（推荐用于命令行）

### 创建的任务文件

我已创建 `Vote/tasks/GetAdmin.ts`，你可以使用：

```powershell
# 本地开发
npx hardhat --network localhost task:admin

# Sepolia 测试网
npx hardhat --network sepolia task:admin
```

### 任务输出示例

```
============================================================
Voting Contract Admin Address
============================================================
Contract Address: 0x9fE46736679d2D9a65F0992F2272dE9f3c7fa6e0
Admin Address:   0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266
============================================================
```

---

## 如何确认管理员地址

### 验证步骤

1. **获取管理员地址**（使用上述任一方法）
2. **在 MetaMask 中查看当前账户**
3. **对比地址是否匹配**
   - 如果匹配 → 你是管理员
   - 如果不匹配 → 切换到管理员账户

### 在页面上验证

- ✅ 如果显示 "✓ You are admin" → 你是管理员
- ❌ 如果没有显示 → 你不是管理员

---

## 总结

**最简单的方法：**

1. **打开页面**
2. **连接钱包**
3. **查看页面顶部** → 显示 "Admin: 0x..." 

**其他方法：**

- 命令行查询：`npx hardhat --network localhost task:admin`
- 查看部署日志
- 查看 Hardhat 节点输出
- 在区块浏览器查看（Sepolia）

现在你可以很方便地获取管理员地址了！

