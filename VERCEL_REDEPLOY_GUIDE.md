# Vercel 重新部署指南

## ⚠️ 配置不匹配警告

如果你看到 "Configuration Settings in the current Production deployment differ from your current Project Settings" 警告，这意味着：

- **项目设置**（Project Settings）已经更新
- **生产部署**（Production deployment）仍在使用旧配置
- **需要重新部署**以应用新配置

## 🔧 解决方法

### 方法 1：通过 Vercel Dashboard 重新部署（推荐）

1. **进入 Vercel Dashboard**
   - 访问 https://vercel.com
   - 选择你的项目

2. **进入 Deployments 页面**
   - 点击左侧菜单的 **Deployments**

3. **找到最新的部署**
   - 找到状态为 "Ready" 或 "Error" 的最新部署

4. **触发重新部署**
   - 点击部署右侧的 **...**（三个点）菜单
   - 选择 **Redeploy**（重新部署）
   - 确认重新部署

### 方法 2：通过 Git 推送触发

```bash
# 创建一个空提交来触发重新部署
cd E:\Spring\Zama\Vote
git commit --allow-empty -m "Trigger Vercel redeploy"
git push origin main
```

### 方法 3：通过 Vercel CLI

```bash
# 安装 Vercel CLI（如果还没有）
npm i -g vercel

# 登录
vercel login

# 在项目目录中
cd ui/packages/nextjs
vercel --prod
```

## ✅ 验证配置

重新部署后，检查部署日志，确认：

1. **Install Command 正确执行**
   - 应该看到：`cd packages/fhevm-sdk && npm install...`
   - 应该看到：`npm run build`（构建 SDK）
   - 应该看到：`cd ../nextjs && npm install...`
   - 应该看到：`✅ SDK copied to node_modules/@fhevm-sdk`

2. **Build Command 正确执行**
   - 应该看到：`cd packages/nextjs && npm run build`
   - 应该看到 Next.js 构建输出

3. **没有错误**
   - 不应该有 `EINVALIDPACKAGENAME` 错误
   - 不应该有 `ENOENT` 错误

## 📋 当前配置检查清单

在重新部署前，确认 Vercel Dashboard → Settings → Build & Development Settings 中：

- [ ] **Root Directory**: `ui`
- [ ] **Install Command**: `cd packages/fhevm-sdk && npm install --legacy-peer-deps && npm run build && cd ../nextjs && npm install --legacy-peer-deps`
- [ ] **Build Command**: `cd packages/nextjs && npm run build`
- [ ] **Output Directory**: `packages/nextjs/.next`（或留空，Next.js 会自动处理）

## 🎯 快速操作

**最快的方法：**

1. 进入 Vercel Dashboard
2. 点击 **Deployments**
3. 找到最新部署
4. 点击 **...** → **Redeploy**
5. 等待部署完成

---

**重新部署后，新的配置就会生效！** 🚀
