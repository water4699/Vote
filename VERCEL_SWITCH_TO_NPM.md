# Vercel 切换到 npm 的完整指南

## ⚠️ 重要：必须切换到 npm

当前错误是因为 Vercel 仍在使用 pnpm。**必须切换到 npm** 才能解决这个问题。

## 📋 步骤 1：在 Vercel Dashboard 中修改设置

### 1.1 进入项目设置

1. 登录 https://vercel.com
2. 选择你的项目
3. 点击 **Settings**（设置）
4. 点击 **Build & Development Settings**（构建和开发设置）

### 1.2 修改以下设置

找到以下设置项并修改：

| 设置项 | 当前值（错误） | 修改为（正确） |
|--------|---------------|---------------|
| **Package Manager** | `pnpm` | `npm` ⚠️ **必须改为 npm** |
| **Install Command** | `pnpm install` | `npm install` |
| **Build Command** | `cd packages/nextjs && pnpm build` | `cd packages/nextjs && npm run build` |

### 1.3 保存设置

点击页面底部的 **Save**（保存）按钮

## 📋 步骤 2：生成 package-lock.json（可选但推荐）

如果项目中没有 `package-lock.json`，Vercel 可能会继续使用 pnpm。

### 2.1 在本地生成 package-lock.json

```bash
# 进入 ui 目录
cd ui

# 删除 pnpm-lock.yaml（可选）
# rm pnpm-lock.yaml

# 使用 npm 安装依赖（会生成 package-lock.json）
npm install

# 提交 package-lock.json
cd ..
git add ui/package-lock.json
git commit -m "Add package-lock.json for npm"
git push origin main
```

## 📋 步骤 3：重新部署

### 方法 1：通过 Vercel Dashboard

1. 进入项目的 **Deployments**（部署）页面
2. 点击最新的部署右侧的 **...** 菜单
3. 选择 **Redeploy**（重新部署）

### 方法 2：通过 Git 推送

```bash
# 创建一个空提交触发重新部署
git commit --allow-empty -m "Trigger Vercel redeploy with npm"
git push origin main
```

## ✅ 验证

部署成功后，检查构建日志：

- ✅ 应该看到 `npm install` 而不是 `pnpm install`
- ✅ 应该看到 `npm run build` 而不是 `pnpm build`
- ✅ 不应该再有 `ERR_INVALID_THIS` 错误

## 🔍 如果仍然失败

### 检查 1：确认 Package Manager 设置

在 Vercel Dashboard → Settings → Build & Development Settings 中：
- **Package Manager** 必须显示为 `npm`（不是 `pnpm` 或 `yarn`）

### 检查 2：确认 Install Command

- **Install Command** 应该显示为 `npm install`（不是 `pnpm install`）

### 检查 3：检查 vercel.json

确保 `ui/packages/nextjs/vercel.json` 中的配置正确：

```json
{
  "buildCommand": "npm run build",
  "installCommand": "npm install"
}
```

### 检查 4：删除 pnpm 相关配置

如果问题仍然存在，可以尝试：

1. 在 Vercel Dashboard 中，**明确设置**：
   - Install Command: `npm install --legacy-peer-deps`
   - Build Command: `cd packages/nextjs && npm run build`

2. 或者联系 Vercel 支持

## 📝 快速检查清单

- [ ] Vercel Dashboard → Settings → Build & Development Settings
- [ ] Package Manager = `npm` ✅
- [ ] Install Command = `npm install` ✅
- [ ] Build Command = `cd packages/nextjs && npm run build` ✅
- [ ] 已保存设置
- [ ] 已重新部署

## 🎯 最终配置（复制粘贴）

在 Vercel Dashboard 中，直接复制以下配置：

**Install Command:**
```
npm install
```

**Build Command:**
```
cd packages/nextjs && npm run build
```

**Package Manager:**
```
npm
```

---

**重要提示：** 如果 Package Manager 选项不可见，可能需要：
1. 删除项目并重新导入
2. 或者使用 Vercel CLI 部署

