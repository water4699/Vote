# 推送到 GitHub - 快速指南

## 🎯 你需要提供什么？

### 必需信息

1. **GitHub 账户信息**
   ```
   - GitHub 用户名: _______________
   - 仓库名称: _______________ (如果已创建)
   - 或者告诉我创建新仓库的名称
   ```

2. **访问方式**（选择一种）
   - [ ] Personal Access Token (PAT)
   - [ ] SSH 密钥（已配置）
   - [ ] GitHub CLI (`gh auth login`)

---

## ⚡ 快速推送（3 步）

### 步骤 1: 初始化 Git

```powershell
cd E:\Spring\Zama\Vote
git init
git add .
git commit -m "Initial commit: Anonymous Voting System with FHEVM"
```

### 步骤 2: 连接 GitHub

**选项 A: HTTPS（需要 PAT）**
```powershell
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git
```

**选项 B: SSH（如果已配置）**
```powershell
git remote add origin git@github.com:YOUR_USERNAME/YOUR_REPO_NAME.git
```

**选项 C: GitHub CLI（最简单）**
```powershell
gh repo create YOUR_REPO_NAME --public --source=. --remote=origin --push
```

### 步骤 3: 推送代码

```powershell
git branch -M main
git push -u origin main
```

---

## 🔒 安全检查（已自动处理）

✅ **已排除的敏感文件：**
- `.hardhat/` - Hardhat 环境变量（包含私钥）
- `deployments/` - 部署信息（包含地址和私钥）
- `*.env` - 环境变量文件
- `node_modules/` - 依赖包
- `artifacts/`, `cache/`, `types/` - 编译产物

✅ **代码中的敏感信息：**
- `hardhat.config.ts` 使用 `vars.get()` - 安全 ✅
- 没有硬编码的私钥或 API 密钥 ✅

---

## 📋 推送前检查清单

- [ ] 已更新 README.md（可选）
- [ ] 已检查敏感信息（已完成）
- [ ] 已选择推送方式（HTTPS/SSH/GitHub CLI）
- [ ] 已准备好 GitHub 账户信息

---

## 🚀 完整命令（复制粘贴）

```powershell
# 进入项目目录
cd E:\Spring\Zama\Vote

# 初始化 Git（如果未初始化）
if (-not (Test-Path .git)) {
    git init
    git add .
    git commit -m "Initial commit: Anonymous Voting System with FHEVM"
}

# 方法 1: 使用 GitHub CLI（推荐）
gh repo create YOUR_REPO_NAME --public --source=. --remote=origin --push

# 方法 2: 手动添加远程并推送
# git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git
# git branch -M main
# git push -u origin main
```

---

## ❓ 常见问题

**Q: 如何获取 Personal Access Token？**
1. GitHub → Settings → Developer settings → Personal access tokens → Tokens (classic)
2. Generate new token (classic)
3. 选择权限：`repo`（完整仓库访问）
4. 复制 token（只显示一次）

**Q: 如何配置 SSH 密钥？**
```powershell
# 检查是否已有 SSH 密钥
ls ~/.ssh/id_rsa.pub

# 如果没有，生成新的
ssh-keygen -t ed25519 -C "your_email@example.com"

# 复制公钥到剪贴板
cat ~/.ssh/id_ed25519.pub | clip

# 添加到 GitHub: Settings → SSH and GPG keys → New SSH key
```

**Q: 如何安装 GitHub CLI？**
```powershell
# Windows (winget)
winget install GitHub.cli

# 登录
gh auth login
```

---

## 📞 需要我帮你推送吗？

**告诉我：**
1. 你的 GitHub 用户名
2. 仓库名称（或让我创建）
3. 你选择的推送方式

**我会执行：**
- ✅ 检查敏感信息
- ✅ 初始化 Git（如果需要）
- ✅ 创建提交
- ✅ 连接到你的 GitHub 仓库
- ✅ 推送代码

**或者你可以自己执行上面的命令！**

