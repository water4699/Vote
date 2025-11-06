# Vercel 部署最终解决方案

## 问题
npm 无法处理 `workspace:*` 或 npm workspaces 在 Vercel 上的问题。

## 解决方案

### 在 Vercel Dashboard 中设置：

**Root Directory:** `ui`

**Install Command:**
```bash
npm install --workspaces=false && cd packages/fhevm-sdk && npm install && npm run build && cd ../nextjs && npm install --legacy-peer-deps
```

**Build Command:**
```bash
cd packages/nextjs && npm run build
```

**Output Directory:** `packages/nextjs/.next`

## 工作原理

1. `npm install --workspaces=false` - 只安装根目录依赖，不处理 workspaces
2. `cd packages/fhevm-sdk && npm install && npm run build` - 构建 SDK
3. `cd ../nextjs && npm install --legacy-peer-deps` - 安装 nextjs 依赖，使用 file: 协议引用已构建的 SDK

## 如果仍然失败

尝试使用 pnpm（如果 Vercel 支持）：

**Install Command:**
```bash
corepack enable && corepack prepare pnpm@latest --activate && pnpm install
```

**Build Command:**
```bash
cd packages/nextjs && pnpm build
```

