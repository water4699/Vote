# Vercel 部署指南

## 🚀 快速部署到 Vercel

### 方法 1：通过 Vercel 网站（推荐）

#### 步骤 1: 登录 Vercel

1. 访问：https://vercel.com
2. 点击 **"Sign Up"** 或 **"Log In"**
3. 选择 **"Continue with GitHub"** 使用你的 GitHub 账户登录

#### 步骤 2: 导入项目

1. 在 Vercel 仪表板，点击 **"Add New..."** → **"Project"**
2. 在 **"Import Git Repository"** 中搜索 `water4699/Vote`
3. 点击 **"Import"**

#### 步骤 3: 配置项目设置

**重要配置：**

1. **Root Directory（根目录）**
   ```
   ui
   ```
   因为前端代码在 `ui/` 目录下

2. **Framework Preset**
   ```
   Next.js
   ```
   （Vercel 会自动检测）

3. **Build Command**
   ```
   cd packages/nextjs && pnpm install && pnpm build
   ```
   或者使用：
   ```
   pnpm --filter nextjs build
   ```

4. **Output Directory**
   ```
   packages/nextjs/.next
   ```
   （Vercel 通常会自动检测）

5. **Install Command**
   ```
   pnpm install
   ```

#### 步骤 4: 设置环境变量

在 **"Environment Variables"** 部分添加：

| 变量名 | 值 | 说明 |
|--------|-----|------|
| `NEXT_PUBLIC_ALCHEMY_API_KEY` | 你的 Alchemy API Key | 可选，用于 RPC 连接 |
| `NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID` | 你的 WalletConnect Project ID | 可选，默认值已配置 |

**获取 API Keys：**

- **Alchemy API Key**: https://dashboard.alchemyapi.io
  - 注册账户
  - 创建新应用
  - 选择 Sepolia 网络
  - 复制 API Key

- **WalletConnect Project ID**: https://cloud.walletconnect.com
  - 注册账户
  - 创建新项目
  - 复制 Project ID

#### 步骤 5: 部署

1. 点击 **"Deploy"**
2. 等待构建完成（通常 2-5 分钟）
3. 部署成功后，你会得到一个 URL，例如：`https://vote-xxx.vercel.app`

---

### 方法 2：使用 Vercel CLI

#### 步骤 1: 安装 Vercel CLI

```powershell
npm install -g vercel
```

#### 步骤 2: 登录 Vercel

```powershell
vercel login
```

#### 步骤 3: 进入项目目录

```powershell
cd E:\Spring\Zama\Vote\ui
```

#### 步骤 4: 部署

```powershell
vercel
```

按照提示：
- 选择项目范围（个人或团队）
- 确认项目名称
- 确认根目录为 `ui`
- 确认构建设置

#### 步骤 5: 设置环境变量

```powershell
vercel env add NEXT_PUBLIC_ALCHEMY_API_KEY
vercel env add NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID
```

---

## ⚙️ 配置文件

### 更新 vercel.json

项目已有 `ui/packages/nextjs/vercel.json`，但需要为 monorepo 结构创建根目录配置：

**在 `Vote/ui/vercel.json` 创建：**

```json
{
  "buildCommand": "cd packages/nextjs && pnpm install && pnpm build",
  "outputDirectory": "packages/nextjs/.next",
  "installCommand": "pnpm install",
  "framework": "nextjs",
  "rootDirectory": "packages/nextjs"
}
```

---

## 🔧 常见问题解决

### 问题 1: 构建失败 - 找不到模块

**原因**: Monorepo 结构需要正确配置

**解决**:
1. 确保 Root Directory 设置为 `ui`
2. 使用正确的 Build Command
3. 确保 `pnpm-workspace.yaml` 配置正确

### 问题 2: 环境变量未生效

**解决**:
1. 在 Vercel 项目设置中添加环境变量
2. 重新部署项目
3. 确保变量名以 `NEXT_PUBLIC_` 开头（如果需要在前端使用）

### 问题 3: 钱包连接失败

**原因**: WalletConnect Project ID 未配置

**解决**:
1. 获取 WalletConnect Project ID
2. 在 Vercel 环境变量中添加 `NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID`
3. 重新部署

### 问题 4: RPC 连接失败

**原因**: Alchemy API Key 未配置或无效

**解决**:
1. 检查 Alchemy API Key 是否正确
2. 确保选择了正确的网络（Sepolia）
3. 在 Vercel 环境变量中添加 `NEXT_PUBLIC_ALCHEMY_API_KEY`

---

## 📝 部署后检查清单

- [ ] 网站可以正常访问
- [ ] 钱包连接功能正常
- [ ] 可以切换到 Sepolia 网络
- [ ] 合约地址正确（检查 `deployedContracts.ts`）
- [ ] 页面样式正常显示
- [ ] 控制台没有错误

---

## 🔄 自动部署

### 启用 GitHub 集成

1. 在 Vercel 项目设置中
2. 进入 **"Git"** 选项卡
3. 确保 **"Production Branch"** 设置为 `main`
4. 每次推送到 `main` 分支时，Vercel 会自动部署

### 预览部署

- 每次创建 Pull Request 时，Vercel 会自动创建预览部署
- 预览 URL 会在 PR 评论中显示

---

## 📊 监控和日志

### 查看部署日志

1. 在 Vercel 仪表板
2. 选择项目
3. 点击 **"Deployments"**
4. 点击特定部署查看日志

### 查看实时日志

```powershell
vercel logs
```

---

## 🎯 优化建议

### 1. 启用 Edge Functions（可选）

如果使用 Next.js Edge Runtime，可以在 `next.config.ts` 中配置：

```typescript
export const config = {
  runtime: 'edge',
}
```

### 2. 优化构建时间

- 使用 `pnpm` 而不是 `npm`（更快）
- 启用 Vercel 的构建缓存
- 使用 `pnpm-lock.yaml` 锁定依赖版本

### 3. 性能优化

- 启用 Vercel Analytics（可选）
- 使用 Next.js Image 优化
- 启用压缩和缓存

---

## 🔗 相关链接

- [Vercel 文档](https://vercel.com/docs)
- [Next.js 部署指南](https://nextjs.org/docs/deployment)
- [Alchemy Dashboard](https://dashboard.alchemyapi.io)
- [WalletConnect Cloud](https://cloud.walletconnect.com)

---

## 📞 需要帮助？

如果遇到问题：
1. 检查 Vercel 部署日志
2. 查看浏览器控制台错误
3. 检查环境变量配置
4. 参考 [Vercel 故障排除指南](https://vercel.com/docs/concepts/deployments/troubleshooting)

