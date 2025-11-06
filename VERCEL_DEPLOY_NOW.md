# 🚀 立即部署到 Vercel

## ✅ 准备工作已完成

- ✅ 代码已推送到 GitHub
- ✅ Vercel 配置文件已创建
- ✅ 部署脚本已准备

---

## 🎯 现在执行部署（3 种方式）

### ⭐ 方式 1: 通过 Vercel 网站（最简单，推荐）

**无需安装任何工具，直接在浏览器操作：**

1. **访问**: https://vercel.com/new
2. **登录**: 使用 GitHub 账户登录
3. **导入项目**: 
   - 搜索 `water4699/Vote`
   - 点击 "Import"
4. **配置项目**:
   ```
   Root Directory: ui
   Framework: Next.js (自动检测)
   Build Command: cd packages/nextjs && pnpm install && pnpm build
   Output Directory: packages/nextjs/.next
   Install Command: pnpm install
   ```
5. **点击**: "Deploy"
6. **等待**: 2-5 分钟完成部署

**完成！** 你会得到一个 URL，例如：`https://vote-xxx.vercel.app`

---

### 方式 2: 使用 PowerShell 脚本

```powershell
cd E:\Spring\Zama\Vote
.\deploy-to-vercel.ps1
```

脚本会引导你完成部署。

---

### 方式 3: 使用 Vercel CLI

```powershell
# 1. 进入项目目录
cd E:\Spring\Zama\Vote\ui\packages\nextjs

# 2. 登录 Vercel
npx vercel login
# 选择 "Continue with GitHub"

# 3. 部署
npx vercel --prod
```

---

## 📝 重要提示

1. **首次部署**需要登录 Vercel
2. **Root Directory** 必须设置为 `ui`
3. **Build Command** 必须正确配置
4. 部署完成后，每次推送代码会自动重新部署

---

## 🔗 相关文件

- `DEPLOY_VERCEL.md` - 详细部署指南
- `VERCEL_DEPLOYMENT_GUIDE.md` - 完整文档
- `deploy-to-vercel.ps1` - 自动化脚本

---

## ✅ 推荐方式

**使用方式 1（网站部署）**，最简单且无需安装任何工具！

