# 🚀 Vercel 部署执行指南

## 已完成的步骤

✅ **步骤 1**: 代码已推送到 GitHub (`water4699/Vote`)
✅ **步骤 2**: Vercel 配置文件已创建
✅ **步骤 3**: 准备部署

---

## 现在执行部署（两种方式）

### 方式 1: 使用自动化脚本（推荐）

```powershell
cd E:\Spring\Zama\Vote
.\deploy-to-vercel.ps1
```

脚本会自动：
1. 检查 Vercel CLI
2. 检查登录状态
3. 如果未登录，提示登录
4. 如果已登录，开始部署

---

### 方式 2: 手动执行命令

#### 步骤 1: 进入项目目录

```powershell
cd E:\Spring\Zama\Vote\ui\packages\nextjs
```

#### 步骤 2: 登录 Vercel（如果未登录）

```powershell
npx vercel login
```

选择 **"Continue with GitHub"**，按照提示完成登录。

#### 步骤 3: 部署到生产环境

```powershell
npx vercel --prod
```

按照提示：
- **Set up and deploy?** → 输入 `Y`
- **Which scope?** → 选择你的账户
- **Link to existing project?** → 输入 `N`（首次部署）
- **Project name?** → 输入 `vote` 或直接回车
- **Directory?** → 直接回车（当前目录）
- **Override settings?** → 输入 `N`（使用默认配置）

---

## 方式 3: 通过 Vercel 网站（最简单）

如果 CLI 方式遇到问题，可以直接在网站上操作：

1. **访问**: https://vercel.com/new
2. **导入项目**: 选择 `water4699/Vote`
3. **配置设置**:
   ```
   Root Directory: ui
   Framework: Next.js
   Build Command: cd packages/nextjs && pnpm install && pnpm build
   Output Directory: packages/nextjs/.next
   Install Command: pnpm install
   ```
4. **点击 Deploy**

---

## 部署后

部署成功后，你会得到：
- **生产 URL**: `https://vote-xxx.vercel.app`
- **预览 URL**: 每次推送都会自动创建预览部署

---

## 环境变量（可选）

如果需要更好的 RPC 连接，在 Vercel 项目设置中添加：

1. 访问 Vercel 项目设置
2. 进入 **Settings** → **Environment Variables**
3. 添加：
   - `NEXT_PUBLIC_ALCHEMY_API_KEY` = 你的 Alchemy Key
   - `NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID` = 你的 WalletConnect Project ID

---

## 自动部署

配置完成后，每次推送到 `main` 分支，Vercel 会自动重新部署。

---

## 需要帮助？

如果遇到问题：
1. 检查 Vercel 部署日志
2. 确保 Root Directory 设置为 `ui`
3. 检查 Build Command 是否正确
4. 查看 `VERCEL_DEPLOYMENT_GUIDE.md` 获取详细说明

