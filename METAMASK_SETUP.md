# MetaMask 设置指南 - Sepolia 测试网

## 问题
当前 MetaMask 账户 `0xbda5747bfd65f08deb54cb465eb87d40e51b197e` 在 Sepolia 上余额为 0，无法支付 gas 费用。

## 解决方案

### 方案 1：使用部署账户（推荐）

部署账户 `0x4452563ff304599Ba76d299EFd13dc03b9d3BBDF` 有足够的 ETH（约 0.17 ETH）。

#### 步骤：

1. **打开 MetaMask**
   - 点击右上角的账户图标
   - 选择 "导入账户" 或 "添加账户"

2. **导入私钥**
   - 选择 "导入账户"
   - 粘贴私钥：`a8f4682e12ea0bc76623f34b47ae9c5f652885b1686bfbe204293d44bca92858`
   - 点击 "导入"

3. **切换到 Sepolia 网络**
   - 确保 MetaMask 连接到 Sepolia 测试网（Chain ID: 11155111）
   - 如果还没有添加 Sepolia，网络设置：
     - 网络名称: Sepolia
     - RPC URL: `https://sepolia.infura.io/v3/b18fb7e6ca7045ac83c41157ab93f990`
     - Chain ID: 11155111
     - 货币符号: ETH
     - 区块浏览器: https://sepolia.etherscan.io

4. **验证**
   - 账户应显示余额约 0.17 ETH
   - 账户地址应为 `0x4452563ff304599Ba76d299EFd13dc03b9d3BBDF`

### 方案 2：给当前账户充值 Sepolia ETH

如果需要使用当前账户 `0xbda5747bfd65f08deb54cb465eb87d40e51b197e`：

#### 步骤：

1. **使用 Sepolia 水龙头获取测试 ETH**
   - 访问：https://sepoliafaucet.com/
   - 或：https://faucet.quicknode.com/ethereum/sepolia
   - 输入地址：`0xbda5747bfd65f08deb54cb465eb87d40e51b197e`
   - 按照提示完成验证并获取测试 ETH

2. **等待充值**
   - 通常需要几分钟到几小时
   - 在 MetaMask 中刷新余额

3. **验证**
   - 确保账户有足够的 ETH（建议至少 0.01 ETH）

### 方案 3：从部署账户转账

如果需要给当前账户充值：

```bash
# 可以使用 Hardhat console 或任何以太坊工具
# 从部署账户转账到当前账户
```

## 注意事项

⚠️ **安全警告**：
- 私钥已暴露，请勿在生产环境使用
- 这是测试账户，仅用于开发测试
- 不要将私钥提交到 Git 仓库

## 验证部署

部署的合约地址：
- **SalaryAggregator**: `0xf545B66a9C8b4aCb087F4D5b7118fC2b15220201`
- **FHECounter**: `0x23d7EA3bB2a8576fAF5A0de9D54875CD28781244`

在 Sepolia 区块浏览器查看：
- https://sepolia.etherscan.io/address/0xf545B66a9C8b4aCb087F4D5b7118fC2b15220201


