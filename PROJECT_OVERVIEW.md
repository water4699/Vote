# 项目核心要点梳理

## 🎯 项目概述

**匿名投票系统 (Anonymous Voting System)** - 使用 FHEVM 实现的隐私保护投票系统

### 核心价值
- ✅ **匿名性**：投票者在链上投票时不暴露个人选择
- ✅ **可验证性**：投票结果加密存储，管理员可解密验证
- ✅ **透明性**：投票过程公开，但匿名

---

## 📚 关键概念理解

### 1. FHEVM (Fully Homomorphic Encryption Virtual Machine)

**什么是 FHEVM？**
- 允许在以太坊上直接对**加密数据**进行计算
- 数据在链上保持加密状态，只有在授权后才能解密

**本项目中的体现：**
```solidity
euint32 encryptedCount;  // 加密的投票计数
```

### 2. 加密数据类型

**`euint32`** - 加密的 32 位无符号整数
- 存储在链上时是加密的（handle）
- 可以进行同态加密操作（加法、乘法等）
- 只有授权用户可以解密

**`externalEuint32`** - 外部传入的加密数据
- 客户端加密后传入合约
- 需要附带 `inputProof` 证明

### 3. 核心工作流程

```
1. 创建投票 (明文)
   ↓
2. 用户投票 (加密) ← 关键：客户端加密
   ↓
3. 链上累加 (加密计算) ← 关键：同态加密
   ↓
4. 管理员授权解密 (链上权限)
   ↓
5. 解密结果 (客户端解密)
```

---

## 🏗️ 项目架构

### 目录结构

```
Vote/
├── contracts/
│   └── Voting.sol          # 核心智能合约 ⭐
├── deploy/
│   └── deploy.ts            # 部署脚本
├── test/
│   ├── Voting.ts            # 本地测试
│   └── VotingSepolia.ts    # Sepolia 测试
├── ui/
│   └── packages/
│       ├── nextjs/          # 前端应用
│       │   ├── app/_components/VotingApp.tsx  # 主组件 ⭐
│       │   └── hooks/voting/useVotingWagmi.tsx  # 业务逻辑 ⭐
│       └── fhevm-sdk/       # FHEVM SDK 封装
└── hardhat.config.ts        # Hardhat 配置 ⭐
```

---

## 🔑 核心文件详解

### 1. `contracts/Voting.sol` - 智能合约

**关键导入：**
```solidity
import {FHE, euint32, externalEuint32} from "@fhevm/solidity/lib/FHE.sol";
import {SepoliaConfig} from "@fhevm/solidity/config/ZamaConfig.sol";
```

**`SepoliaConfig` 的作用：**
- 继承 `SepoliaConfig` 自动配置 FHEVM 网络地址
- 构造函数中设置 coprocessor 地址（ACL、KMS 等）
- 支持 Sepolia 测试网和本地 Hardhat 节点

**核心数据结构：**
```solidity
struct VoteOption {
    string description;        // 选项描述（明文）
    euint32 encryptedCount;    // 加密的投票计数 ⭐
    bool initialized;          // 是否已初始化
}

struct Poll {
    string title;
    bool active;
    mapping(uint32 => VoteOption) options;  // 选项映射
    mapping(address => bool) hasVoted;      // 投票记录
    uint32 totalVotes;                      // 总票数（明文）
}
```

**关键函数：**

| 函数 | 作用 | 加密类型 |
|------|------|----------|
| `createPoll()` | 创建投票 | 无（明文） |
| `castVote()` | 投票 | ⭐ **加密输入** |
| `allowAdminToDecrypt()` | 授权解密 | 权限设置 |
| `getEncryptedVoteCount()` | 获取加密计数 | 返回 handle |

---

### 2. `useVotingWagmi.tsx` - 前端业务逻辑

**核心职责：**
- 管理合约交互
- 处理加密/解密操作
- 管理状态（投票列表、选中投票等）

**关键 Hooks：**

```typescript
// 1. FHEVM 实例
const { instance } = useFhevm({ provider, chainId, initialMockChains });

// 2. 加密工具
const { encryptWith } = useFHEEncryption({ 
  instance, 
  contractAddress: votingContract.address 
});

// 3. 解密工具
const { decrypt, canDecrypt, results } = useFHEDecrypt({
  instance,
  requests: [{ handle, contractAddress }],
});
```

**重要函数：**

**`createPoll()`** - 创建投票
```typescript
// 明文数据，直接调用合约
await write.createPoll(title, description, options);
```

**`castVote()`** - 投票（关键：加密）
```typescript
// 1. 客户端加密投票值（1）
const enc = await encryptWith(builder => {
  builder.add32(1);  // 加密数字 1
});

// 2. 传入加密数据到合约
await write.castVote(pollId, optionIndex, enc.handles[0], enc.inputProof);
```

**`decrypt()`** - 解密结果
```typescript
// 1. 管理员授权解密（链上）
await write.allowAdminToDecrypt(pollId, optionIndex);

// 2. 客户端解密（链下）
await decrypt();
// results[handle] 包含解密后的值
```

---

### 3. `hardhat.config.ts` - 配置

**关键配置：**
```typescript
import "@fhevm/hardhat-plugin";  // ⭐ 必须导入

// Solidity 版本
solidity: {
  version: "0.8.27",
  evmVersion: "cancun",  // ⭐ 必须使用 cancun
}
```

**FHEVM 插件的作用：**
- 自动处理 `@fhevm/solidity` 导入
- 设置正确的路径映射
- 生成必要的类型定义

---

## 🔐 加密流程详解

### 投票流程（加密）

```
用户选择选项
    ↓
前端加密 (encryptWith)
    ↓
生成: { handles: [bytes32], inputProof: bytes }
    ↓
调用合约: castVote(pollId, optionIndex, handle, proof)
    ↓
合约验证: FHE.fromExternal(handle, proof)
    ↓
累加: FHE.add(encryptedCount, encryptedVote)
    ↓
存储: encryptedCount (加密状态)
```

### 解密流程

```
管理员授权: allowAdminToDecrypt()
    ↓
链上权限: FHE.allow(encryptedCount, admin)
    ↓
获取 handle: getEncryptedVoteCount()
    ↓
客户端解密: decrypt({ handle, contractAddress })
    ↓
显示结果: results[handle] = 解密后的值
```

---

## 🎨 前端架构

### 组件层次

```
VotingApp.tsx (主组件)
  ├── Header (顶部导航)
  ├── Create Poll Section (创建投票)
  ├── Polls List (投票列表)
  └── Poll Details (投票详情)
      ├── Voting Section (投票)
      ├── Statistics (统计)
      ├── Encrypted Counts (加密计数)
      └── Admin Controls (管理员控制)
```

### 状态管理

**主要状态：**
- `pollCount` - 投票总数
- `selectedPollId` - 当前选中的投票
- `pollInfo` - 投票信息
- `encryptedCounts` - 加密计数（handles）
- `decryptedCounts` - 解密后的计数
- `isAdmin` - 是否为管理员

---

## 🔧 关键技术点

### 1. 客户端加密（Client-Side Encryption）

**为什么在客户端加密？**
- 数据在发送到链上前就已经加密
- 即使监听链上交易，也无法知道投票内容
- 只有合约和授权用户可以操作加密数据

**实现：**
```typescript
// 使用 FHEVM SDK 加密
const enc = await encryptWith(builder => {
  builder.add32(1);  // 加密数字 1
});
```

### 2. 同态加密（Homomorphic Encryption）

**核心特性：**
- 可以在加密数据上直接进行计算
- 不需要先解密
- 结果仍是加密的

**在合约中的体现：**
```solidity
// 累加加密的投票
option.encryptedCount = FHE.add(option.encryptedCount, encryptedVote);
// 这两个值都是加密的，但可以直接相加
```

### 3. 权限控制（Access Control）

**解密权限：**
```solidity
// 设置合约自己可以访问
FHE.allowThis(option.encryptedCount);

// 允许管理员访问
FHE.allow(option.encryptedCount, admin);
```

**只有授权后才能解密：**
- 没有授权 → 无法解密
- 授权后 → 管理员可以解密

---

## 📝 关键配置

### 1. Hardhat 配置

**必须的导入：**
```typescript
import "@fhevm/hardhat-plugin";
```

**Solidity 设置：**
```typescript
evmVersion: "cancun"  // 必须使用 Cancun 升级
```

### 2. 前端配置

**FHEVM 实例初始化：**
```typescript
const initialMockChains = { 
  31337: "http://localhost:8545"  // 本地 Hardhat 节点
};

const { instance } = useFhevm({ 
  provider, 
  chainId, 
  initialMockChains 
});
```

**合约地址配置：**
```typescript
// deployedContracts.ts
deployedContracts = {
  31337: {  // localhost
    Voting: { address: "0x...", abi: [...] }
  },
  11155111: {  // Sepolia
    Voting: { address: "0x...", abi: [...] }
  }
}
```

---

## 🚀 完整工作流程

### 1. 部署流程

```
1. 启动 Hardhat 节点
   npx hardhat node

2. 部署合约
   npx hardhat deploy --network localhost

3. 更新前端配置
   deployedContracts.ts (自动或手动)
```

### 2. 使用流程

```
1. 用户连接钱包
   ↓
2. 创建投票（管理员）
   createPoll(title, description, options)
   ↓
3. 用户投票
   castVote(pollId, optionIndex)  // 自动加密
   ↓
4. 管理员授权解密
   allowAdminToDecrypt(pollId, optionIndex)
   ↓
5. 解密并显示结果
   decrypt() → results[handle]
```

---

## ⚠️ 常见问题解决

### 1. 编译错误：找不到 ZamaConfig.sol

**解决：**
```bash
npm run clean
npm run compile
```

### 2. 解密失败

**原因：**
- 没有先授权解密
- 不是管理员账户

**解决：**
1. 使用管理员账户
2. 先调用 `allowAdminToDecrypt`
3. 等待交易确认
4. 再调用 `decrypt`

### 3. Relayer 连接失败

**原因：**
- Sepolia relayer 服务不可用
- 本地节点未启动

**解决：**
- 优先使用 localhost
- 确保 Hardhat 节点运行

---

## 📚 核心概念总结

### 必须理解的概念

1. **FHEVM** - 全同态加密虚拟机
2. **euint32** - 加密的整数类型
3. **Handle** - 加密数据在链上的标识符
4. **同态运算** - 直接对加密数据计算
5. **权限控制** - FHE.allow() 解密权限

### 关键文件

1. **Voting.sol** - 智能合约核心逻辑
2. **useVotingWagmi.tsx** - 前端业务逻辑
3. **VotingApp.tsx** - UI 组件
4. **hardhat.config.ts** - 构建配置

### 关键函数

1. **castVote()** - 加密投票
2. **allowAdminToDecrypt()** - 授权解密
3. **decrypt()** - 解密结果
4. **createPoll()** - 创建投票

---

## 🎓 学习路径

1. **理解 FHEVM 基础**
   - 什么是全同态加密
   - 为什么需要客户端加密

2. **理解合约逻辑**
   - 数据结构的加密/明文混合
   - 权限控制和访问控制

3. **理解前端集成**
   - FHEVM SDK 的使用
   - 加密/解密流程

4. **实践测试**
   - 本地测试流程
   - Sepolia 测试流程

---

## 💡 项目亮点

1. **隐私保护** - 投票内容完全匿名
2. **可验证性** - 结果可解密验证
3. **去中心化** - 无需信任第三方
4. **透明性** - 投票过程公开可查

---

## 🔗 相关资源

- [FHEVM 官方文档](https://docs.zama.ai/fhevm)
- [FHEVM Solidity 库](https://github.com/zama-ai/fhevm-solidity)
- [Hardhat 插件](https://github.com/zama-ai/fhevm-hardhat-plugin)

