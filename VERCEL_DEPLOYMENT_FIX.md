# Vercel 部署失败修复指南

## 🔴 错误：DEPLOYMENT_NOT_FOUND

这个错误通常表示：
1. 构建失败
2. Output Directory 配置错误
3. 找不到构建输出文件

---

## 🔧 解决方案

### 方案 1: 检查并修复 Output Directory

在 Vercel Settings → Build & Development Settings 中：

#### 选项 A: 设置正确的 Output Directory

```
packages/nextjs/.next
```

#### 选项 B: 留空（推荐）

**删除 Output Directory 的值，留空**

Next.js 会自动检测输出目录，通常不需要手动设置。

---

### 方案 2: 检查 Build Command

确保 Build Command 设置为：

```
cd packages/nextjs && pnpm install && pnpm build
```

或者：

```
pnpm --filter nextjs build
```

---

### 方案 3: 简化 vercel.json 配置

当前 `ui/packages/nextjs/vercel.json` 可能有问题，尝试删除它或简化：

**选项 A: 删除 vercel.json**

删除 `ui/packages/nextjs/vercel.json`，让 Vercel 使用默认配置。

**选项 B: 简化 vercel.json**

只保留必要的配置：

```json
{
  "buildCommand": "pnpm build"
}
```

---

### 方案 4: 检查构建日志

1. **进入项目**: https://vercel.com/dashboard
2. **选择项目**: 点击 "Vote"
3. **查看部署**: 点击 "Deployments"
4. **查看日志**: 点击失败的部署，查看 "Build Logs"
5. **查找错误**: 查看具体的错误信息

---

## 📋 推荐的完整配置

在 Vercel Settings → Build & Development Settings 中：

| 设置项 | 值 |
|--------|-----|
| **Root Directory** | `ui` |
| **Framework Preset** | `Next.js` |
| **Build Command** | `cd packages/nextjs && pnpm install && pnpm build` |
| **Output Directory** | **留空**（不填）⭐ |
| **Install Command** | `pnpm install` |

**关键**: Output Directory **留空**，让 Next.js 自动检测！

---

## 🔍 检查步骤

### 步骤 1: 查看构建日志

1. 进入 Vercel 项目
2. 点击 "Deployments"
3. 点击最新的部署
4. 查看 "Build Logs"
5. 查找错误信息

### 步骤 2: 检查本地构建

在本地测试构建是否成功：

```powershell
cd E:\Spring\Zama\Vote\ui
pnpm install
cd packages/nextjs
pnpm build
```

如果本地构建成功，问题可能在 Vercel 配置。
如果本地构建失败，需要先修复代码问题。

---

## 🛠️ 快速修复步骤

### 方法 1: 重新配置项目

1. **删除项目**（如果允许）:
   - Settings → 底部 → "Delete Project"

2. **重新导入**:
   - 访问：https://vercel.com/new
   - 导入 `water4699/Vote`
   - **Root Directory**: `ui`
   - **Output Directory**: **留空** ⭐
   - **Build Command**: `cd packages/nextjs && pnpm install && pnpm build`
   - 点击 "Deploy"

### 方法 2: 修改现有项目设置

1. **进入项目设置**:
   - Dashboard → 选择项目 → Settings

2. **修改 Build & Development Settings**:
   - **Output Directory**: **删除所有内容，留空** ⭐
   - **Build Command**: `cd packages/nextjs && pnpm install && pnpm build`
   - 保存设置

3. **重新部署**:
   - Deployments → "Redeploy"

---

## ✅ 验证配置

部署成功后，检查：

1. **部署状态**: 应该是 "Ready" 或 "Success"
2. **访问 URL**: 点击部署的 URL，应该能看到网站
3. **构建日志**: 没有错误信息

---

## 🆘 如果还是失败

请提供：
1. **构建日志的完整内容**（从 Vercel 复制）
2. **Build Command 的设置值**
3. **Output Directory 的设置值**（是否留空）
4. **本地构建是否成功**

我可以根据具体错误信息提供更精确的解决方案。

