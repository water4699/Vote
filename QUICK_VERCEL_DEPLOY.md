# 🚀 Vercel 快速部署指南

## 最简单的方法（5 分钟）

### 步骤 1: 访问 Vercel

1. 打开：https://vercel.com
2. 点击 **"Sign Up"** 或 **"Log In"**
3. 选择 **"Continue with GitHub"**

### 步骤 2: 导入项目

1. 点击 **"Add New..."** → **"Project"**
2. 搜索并选择 `water4699/Vote`
3. 点击 **"Import"**

### 步骤 3: 配置项目

**关键设置：**

```
Root Directory: ui
Framework: Next.js (自动检测)
Build Command: cd packages/nextjs && pnpm install && pnpm build
Output Directory: packages/nextjs/.next
Install Command: pnpm install
```

### 步骤 4: 环境变量（可选）

如果需要更好的 RPC 连接，添加：

```
NEXT_PUBLIC_ALCHEMY_API_KEY = 你的 Alchemy Key
```

获取方式：https://dashboard.alchemyapi.io

### 步骤 5: 部署

点击 **"Deploy"**，等待 2-5 分钟完成！

---

## ✅ 部署后

你会得到一个 URL，例如：
```
https://vote-xxx.vercel.app
```

访问这个 URL 即可使用你的投票系统！

---

## 🔄 自动部署

每次推送到 `main` 分支，Vercel 会自动重新部署。

---

## ❓ 遇到问题？

1. **构建失败**：检查 Root Directory 是否为 `ui`
2. **找不到模块**：确保 Build Command 正确
3. **钱包连接失败**：检查环境变量

查看详细指南：`VERCEL_DEPLOYMENT_GUIDE.md`

