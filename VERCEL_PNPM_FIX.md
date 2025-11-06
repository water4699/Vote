# Vercel pnpm 错误修复指南

## 问题描述

在 Vercel 部署时遇到 `ERR_INVALID_THIS` 错误，这是 pnpm 在 Vercel 上的已知问题。

## 解决方案

### 方案 1：使用 npm 代替 pnpm（推荐，最简单）

在 Vercel Dashboard 中：

1. 进入项目设置 → **Build & Development Settings**
2. 将 **Package Manager** 改为 `npm`
3. 更新 **Install Command** 为：
   ```
   npm install
   ```
4. 更新 **Build Command** 为：
   ```
   cd packages/nextjs && npm run build
   ```

### 方案 2：使用更新的 pnpm 配置

如果必须使用 pnpm，在 Vercel Dashboard 中：

1. **Install Command** 设置为：
   ```
   corepack enable && corepack prepare pnpm@latest --activate && pnpm install --no-frozen-lockfile
   ```

2. **Build Command** 设置为：
   ```
   cd packages/nextjs && pnpm build
   ```

3. 添加环境变量：
   - `ENABLE_EXPERIMENTAL_COREPACK=1`

### 方案 3：使用 Vercel CLI 部署

```bash
# 安装 Vercel CLI
npm i -g vercel

# 登录
vercel login

# 在项目根目录执行
cd ui/packages/nextjs
vercel --prod
```

## 推荐配置（使用 npm）

| 设置项 | 值 |
|--------|-----|
| Framework Preset | `Next.js` |
| Root Directory | `ui` |
| Package Manager | `npm` |
| Install Command | `npm install` |
| Build Command | `cd packages/nextjs && npm run build` |
| Output Directory | `Next.js default` |

## 为什么推荐使用 npm？

1. ✅ Vercel 对 npm 支持最好
2. ✅ 避免 pnpm 的兼容性问题
3. ✅ 部署速度更快
4. ✅ 更少的错误

## 注意事项

- 如果使用 npm，需要确保 `package-lock.json` 文件存在
- 如果项目中有 `pnpm-lock.yaml`，可以保留，但 Vercel 会使用 npm
- npm 和 pnpm 的依赖解析略有不同，但通常不会有问题

