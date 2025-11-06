# Vercel 配置修复说明

## ✅ 已修复的问题

**错误**: `Invalid request: should NOT have additional property 'rootDirectory'`

**原因**: Vercel 不允许在 `vercel.json` 中使用 `rootDirectory` 属性。Root Directory 必须在 Vercel 网站的项目设置中配置。

## 🔧 正确的配置方式

### 1. 配置文件（vercel.json）

**位置**: `ui/packages/nextjs/vercel.json`

```json
{
  "installCommand": "cd ../.. && pnpm install",
  "buildCommand": "pnpm build"
}
```

**注意**: 
- ❌ 不要包含 `rootDirectory`
- ❌ 不要包含 `outputDirectory`（Next.js 会自动检测）
- ✅ 只保留必要的构建命令

### 2. Vercel 网站项目设置

在 Vercel 网站的项目设置中手动配置：

1. 进入项目：https://vercel.com/dashboard
2. 选择你的项目
3. 进入 **Settings** → **General**
4. 找到 **Root Directory** 设置
5. 设置为：`ui`
6. 保存设置

或者在导入项目时：
- 在导入页面，找到 **Root Directory** 字段
- 输入：`ui`
- 然后继续配置

## 📝 完整的项目设置

在 Vercel 网站配置以下设置：

| 设置项 | 值 |
|--------|-----|
| **Root Directory** | `ui` |
| **Framework Preset** | `Next.js` |
| **Build Command** | `cd packages/nextjs && pnpm install && pnpm build` |
| **Output Directory** | `packages/nextjs/.next` |
| **Install Command** | `pnpm install` |

## ✅ 验证配置

配置完成后：
1. 保存设置
2. 触发新的部署
3. 检查构建日志，确认配置正确

## 🚨 重要提示

- **Root Directory** 必须在 Vercel 网站设置，**不要**放在 `vercel.json` 中
- `vercel.json` 只用于覆盖默认的构建命令
- 对于 Next.js 项目，`outputDirectory` 通常不需要手动指定

