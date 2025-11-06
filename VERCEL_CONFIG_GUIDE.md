# Vercel 部署配置指南

本文档详细说明如何配置 Vercel 部署项目。

## 📋 目录

1. [Vercel 项目设置](#vercel-项目设置)
2. [环境变量配置](#环境变量配置)
3. [GitHub Secrets 配置（可选）](#github-secrets-配置可选)
4. [验证部署](#验证部署)

---

## 🚀 Vercel 项目设置

### 方法一：通过 Vercel Dashboard（推荐）

1. **登录 Vercel**
   - 访问 https://vercel.com
   - 使用 GitHub 账号登录

2. **导入项目**
   - 点击 "Add New..." → "Project"
   - 选择你的 GitHub 仓库 `water4699/Vote`
   - 点击 "Import"

3. **配置项目设置**
   
   在项目设置页面，配置以下内容：

   | 设置项 | 值 | 说明 |
   |--------|-----|------|
   | **Root Directory** | `ui` | 项目根目录 |
   | **Framework Preset** | `Next.js` | 框架类型（自动检测） |
   | **Build Command** | `cd packages/nextjs && pnpm install && pnpm build` | 构建命令 |
   | **Output Directory** | `packages/nextjs/.next` | 输出目录（Next.js 自动处理，可留空） |
   | **Install Command** | `cd ../.. && pnpm install` | 安装命令 |
   | **Node.js Version** | `20.x` | Node.js 版本 |

   **重要提示：**
   - Root Directory 必须设置为 `ui`
   - Build Command 需要先进入 `packages/nextjs` 目录
   - Install Command 需要在 `ui` 目录执行 `pnpm install`

4. **保存设置**
   - 点击 "Deploy" 开始部署

---

## 🔐 环境变量配置

### 必需的环境变量

在 Vercel Dashboard → Project Settings → Environment Variables 中添加：

| 变量名 | 说明 | 获取方式 |
|--------|------|----------|
| `NEXT_PUBLIC_ALCHEMY_API_KEY` | Alchemy API 密钥 | [Alchemy Dashboard](https://dashboard.alchemyapi.io) |
| `NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID` | WalletConnect 项目 ID | [WalletConnect Cloud](https://cloud.walletconnect.com) |

### 获取 Alchemy API Key

1. 访问 https://dashboard.alchemyapi.io
2. 注册/登录账号
3. 创建新应用（选择 Sepolia 网络）
4. 复制 API Key
5. 在 Vercel 中添加环境变量：`NEXT_PUBLIC_ALCHEMY_API_KEY`

### 获取 WalletConnect Project ID

1. 访问 https://cloud.walletconnect.com
2. 注册/登录账号
3. 创建新项目
4. 复制 Project ID
5. 在 Vercel 中添加环境变量：`NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID`

**注意：** 如果使用默认值，可以不设置 `NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID`（代码中有默认值）

### 环境变量设置步骤

1. 进入 Vercel Dashboard
2. 选择你的项目
3. 进入 **Settings** → **Environment Variables**
4. 添加每个环境变量：
   - **Key**: `NEXT_PUBLIC_ALCHEMY_API_KEY`
   - **Value**: 你的 Alchemy API Key
   - **Environment**: 选择 `Production`, `Preview`, `Development`（建议全选）
5. 点击 "Save"
6. 重复步骤 4-5 添加其他环境变量

---

## 🔑 GitHub Secrets 配置（可选）

如果使用 GitHub Actions 自动部署，需要在 GitHub 仓库中添加以下 Secrets：

### 1. Vercel 相关 Secrets

| Secret 名称 | 说明 | 获取方式 |
|------------|------|----------|
| `VERCEL_TOKEN` | Vercel API Token | 见下方步骤 |
| `VERCEL_ORG_ID` | Vercel 组织 ID | 见下方步骤 |
| `VERCEL_PROJECT_ID` | Vercel 项目 ID | 见下方步骤 |

### 获取 Vercel Token

1. 访问 https://vercel.com/account/tokens
2. 点击 "Create Token"
3. 输入 Token 名称（如：`github-actions-deploy`）
4. 选择过期时间（建议选择 "No Expiration"）
5. 点击 "Create"
6. **复制 Token**（只显示一次，请妥善保存）

### 获取 Vercel Org ID 和 Project ID

**方法一：通过 Vercel Dashboard**

1. 进入项目设置：**Settings** → **General**
2. 在页面底部找到 **Project ID**（格式：`prj_xxxxxxxxxxxxx`）
3. 在页面顶部找到 **Team ID**（格式：`team_xxxxxxxxxxxxx`）

**方法二：通过 Vercel CLI**

```bash
# 安装 Vercel CLI
npm i -g vercel

# 登录
vercel login

# 在项目目录中执行
cd ui/packages/nextjs
vercel link

# 查看项目信息
vercel project ls
```

### 2. 环境变量 Secrets（可选）

如果不想在 Vercel Dashboard 中设置，也可以在 GitHub Secrets 中添加：

| Secret 名称 | 说明 |
|------------|------|
| `NEXT_PUBLIC_ALCHEMY_API_KEY` | Alchemy API Key |
| `NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID` | WalletConnect Project ID |

### 添加 GitHub Secrets 步骤

1. 进入 GitHub 仓库：https://github.com/water4699/Vote
2. 进入 **Settings** → **Secrets and variables** → **Actions**
3. 点击 **New repository secret**
4. 输入 Secret 名称和值
5. 点击 **Add secret**
6. 重复步骤 3-5 添加所有需要的 Secrets

---

## ✅ 验证部署

### 1. 检查部署状态

1. 进入 Vercel Dashboard
2. 查看 **Deployments** 标签页
3. 确认部署状态为 **Ready**

### 2. 访问部署的网站

部署成功后，Vercel 会提供一个 URL：
- 格式：`https://your-project-name.vercel.app`
- 可以在项目设置中配置自定义域名

### 3. 测试功能

1. 打开部署的网站
2. 连接钱包（MetaMask 等）
3. 测试投票功能
4. 确认所有功能正常工作

---

## 🔧 常见问题

### 问题 1：部署失败 - Build Error

**解决方案：**
- 检查 Root Directory 是否设置为 `ui`
- 检查 Build Command 是否正确
- 查看部署日志中的具体错误信息

### 问题 2：环境变量未生效

**解决方案：**
- 确认环境变量名称正确（注意大小写）
- 确认环境变量已添加到正确的环境（Production/Preview/Development）
- 重新部署项目

### 问题 3：找不到合约

**解决方案：**
- 确认合约已部署到 Sepolia 网络
- 检查 `deployedContracts.ts` 中的合约地址是否正确
- 确认钱包连接的网络是 Sepolia

### 问题 4：GitHub Actions 部署失败

**解决方案：**
- 检查 GitHub Secrets 是否配置正确
- 确认 VERCEL_TOKEN 有效
- 查看 GitHub Actions 日志中的错误信息

---

## 📝 配置检查清单

部署前请确认：

- [ ] Vercel 项目已创建并连接到 GitHub 仓库
- [ ] Root Directory 设置为 `ui`
- [ ] Build Command 配置正确
- [ ] `NEXT_PUBLIC_ALCHEMY_API_KEY` 已设置
- [ ] `NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID` 已设置（或使用默认值）
- [ ] GitHub Secrets 已配置（如果使用 GitHub Actions）
- [ ] 合约已部署到 Sepolia 网络
- [ ] `deployedContracts.ts` 中的地址正确

---

## 🎯 快速配置命令（CLI 方式）

如果你更喜欢使用命令行：

```bash
# 1. 安装 Vercel CLI
npm i -g vercel

# 2. 登录
vercel login

# 3. 进入项目目录
cd ui/packages/nextjs

# 4. 链接项目
vercel link

# 5. 部署
vercel --prod
```

---

## 📚 参考资源

- [Vercel 文档](https://vercel.com/docs)
- [Next.js 部署指南](https://nextjs.org/docs/deployment)
- [Alchemy Dashboard](https://dashboard.alchemyapi.io)
- [WalletConnect Cloud](https://cloud.walletconnect.com)

---

**配置完成后，每次推送到 `main` 分支，Vercel 会自动部署新版本！** 🚀

