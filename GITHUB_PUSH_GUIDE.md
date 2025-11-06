# GitHub 推送指南

## 📋 推送前检查清单

### ✅ 必须提供的信息

1. **GitHub 账户信息**
   - GitHub 用户名
   - GitHub 仓库名称（如果已创建）
   - 或者告诉我创建新仓库的名称

2. **访问权限**
   - Personal Access Token (PAT) 或 SSH 密钥
   - 或者使用 GitHub CLI (`gh auth login`)

### ⚠️ 敏感信息检查

在推送前，确保以下敏感信息**不会**被提交：

#### 1. Hardhat 环境变量（已自动排除）
- ✅ `.hardhat/` 目录（Hardhat vars 存储位置）
- ✅ `*.env` 文件
- ✅ `deployments/` 目录（包含部署信息）

#### 2. 已排除的文件/目录
根据 `.gitignore`，以下内容**不会**被推送：
- `node_modules/` - 依赖包
- `artifacts/` - 编译产物
- `cache/` - 缓存文件
- `coverage/` - 测试覆盖率
- `types/` - TypeScript 类型定义
- `deployments/` - 部署信息（包含地址和私钥）
- `fhevmTemp/` - FHEVM 临时文件
- `*.log` - 日志文件
- `.DS_Store` - macOS 系统文件

#### 3. 需要手动检查的文件

**检查这些文件是否包含敏感信息：**

```bash
# 检查 hardhat.config.ts（已使用 vars.get，安全）
# 检查部署脚本 deploy.ts（应该只包含逻辑，不包含私钥）
# 检查测试文件（可能包含测试私钥，但通常可以提交）
```

**如果发现敏感信息：**
- 使用 `git rm --cached <file>` 移除已跟踪的文件
- 更新 `.gitignore` 添加新的排除规则
- 考虑使用环境变量或 Hardhat vars

---

## 🚀 推送步骤

### 方法 1：使用 GitHub CLI（推荐）

```powershell
# 1. 安装 GitHub CLI（如果未安装）
# winget install GitHub.cli

# 2. 登录 GitHub
gh auth login

# 3. 初始化 Git 仓库（如果未初始化）
cd E:\Spring\Zama\Vote
git init

# 4. 添加所有文件（.gitignore 会自动排除敏感文件）
git add .

# 5. 创建初始提交
git commit -m "Initial commit: Anonymous Voting System with FHEVM"

# 6. 创建 GitHub 仓库并推送
gh repo create <repository-name> --public --source=. --remote=origin --push
```

### 方法 2：手动创建仓库

```powershell
# 1. 初始化 Git 仓库
cd E:\Spring\Zama\Vote
git init

# 2. 添加文件
git add .

# 3. 创建初始提交
git commit -m "Initial commit: Anonymous Voting System with FHEVM"

# 4. 添加远程仓库（替换为你的仓库 URL）
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git

# 5. 推送代码
git branch -M main
git push -u origin main
```

### 方法 3：使用 SSH（如果已配置）

```powershell
# 1-3 步骤同上

# 4. 添加 SSH 远程仓库
git remote add origin git@github.com:YOUR_USERNAME/YOUR_REPO_NAME.git

# 5. 推送代码
git branch -M main
git push -u origin main
```

---

## 📝 推送前准备

### 1. 更新 README.md

建议更新 `README.md` 包含：
- 项目描述
- 安装步骤
- 使用说明
- 许可证信息

### 2. 检查许可证

项目使用 `BSD-3-Clause-Clear` 许可证，已包含 `LICENSE` 文件。

### 3. 创建 .gitattributes（可选）

如果需要统一换行符：

```bash
# 创建 .gitattributes
echo "* text=auto" > .gitattributes
echo "*.sol text eol=lf" >> .gitattributes
echo "*.ts text eol=lf" >> .gitattributes
echo "*.tsx text eol=lf" >> .gitattributes
```

---

## 🔒 安全最佳实践

### 1. 使用 Hardhat Vars（已配置）

项目已使用 Hardhat vars 存储敏感信息：
```typescript
const MNEMONIC = vars.get("MNEMONIC", "default");
const INFURA_API_KEY = vars.get("INFURA_API_KEY", "default");
```

**这些值不会出现在代码中**，存储在 `.hardhat/` 目录（已排除）。

### 2. 环境变量文件

如果使用 `.env` 文件：
- ✅ 已添加到 `.gitignore`
- ✅ 不会被打包提交
- ⚠️ 确保没有意外提交

### 3. 部署信息

`deployments/` 目录包含：
- 合约地址
- 部署交易哈希
- **可能包含私钥信息**（如果使用 `hardhat-deploy` 的默认配置）

**已排除**，不会提交。

---

## 📦 推送后设置

### 1. GitHub Secrets（如果需要 CI/CD）

如果设置 GitHub Actions，需要添加 Secrets：
- `MNEMONIC` - 助记词
- `INFURA_API_KEY` - Infura API 密钥
- `ETHERSCAN_API_KEY` - Etherscan API 密钥
- `SEPOLIA_PRIVATE_KEY` - Sepolia 私钥（可选）

### 2. 仓库设置

1. **添加描述**：FHEVM-based anonymous voting system
2. **添加主题标签**：`fhevm`, `solidity`, `ethereum`, `voting`, `privacy`
3. **设置可见性**：Public / Private
4. **添加 README**：已包含

### 3. 保护分支（可选）

如果使用 main 分支：
- Settings → Branches → Add rule
- Require pull request reviews
- Require status checks

---

## ✅ 推送后验证

推送完成后，检查：

1. **文件完整性**
   - 所有源代码文件已上传
   - 敏感文件未上传（检查 `deployments/` 目录）

2. **仓库可克隆**
   ```bash
   git clone https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git
   cd YOUR_REPO_NAME
   npm install
   npm run compile
   ```

3. **README 显示正确**
   - 检查 GitHub 上的 README.md 渲染

---

## 🆘 常见问题

### Q: 如何移除已提交的敏感文件？

```bash
# 1. 从 Git 历史中移除文件
git rm --cached deployments/sepolia/Voting.json

# 2. 更新 .gitignore
echo "deployments/" >> .gitignore

# 3. 提交更改
git commit -m "Remove sensitive deployment files"

# 4. 如果已推送，需要强制推送（谨慎使用）
git push --force
```

### Q: 如何更新远程仓库 URL？

```bash
# 查看当前远程 URL
git remote -v

# 更新 URL
git remote set-url origin https://github.com/NEW_USERNAME/NEW_REPO_NAME.git

# 验证
git remote -v
```

### Q: 如何添加多个远程仓库？

```bash
# 添加第二个远程（例如：备份）
git remote add backup https://github.com/YOUR_USERNAME/BACKUP_REPO.git

# 推送到多个远程
git push origin main
git push backup main
```

---

## 📋 推送命令总结

```powershell
# 完整推送流程
cd E:\Spring\Zama\Vote

# 初始化（如果未初始化）
git init

# 检查状态
git status

# 添加文件
git add .

# 创建提交
git commit -m "Initial commit: Anonymous Voting System with FHEVM"

# 添加远程（替换为你的仓库）
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git

# 推送
git branch -M main
git push -u origin main
```

---

## 🎯 下一步

推送成功后：

1. **添加项目描述和标签**
2. **创建 Issues 模板**（可选）
3. **设置 GitHub Pages**（如果需要文档）
4. **添加贡献指南**（CONTRIBUTING.md）
5. **设置 CI/CD**（GitHub Actions）

---

## 📞 需要帮助？

如果遇到问题：
1. 检查 Git 配置：`git config --list`
2. 检查远程仓库：`git remote -v`
3. 查看 Git 日志：`git log --oneline`
4. 检查 `.gitignore` 是否正确排除文件

