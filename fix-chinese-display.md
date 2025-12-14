# 修复终端中文显示问题 (Windows 11)

## 已完成的配置

### 1. 终端字体配置
已在 Cursor 设置中添加支持中文的字体：
- Consolas（默认）
- Microsoft YaHei（微软雅黑）
- SimHei（黑体）
- SimSun（宋体）

### 2. Git Bash 编码配置
- UTF-8 环境变量
- Windows 代码页设置为 UTF-8 (65001)
- Git 中文文件名支持

## 如果中文仍然无法显示

### 方案 1：手动设置终端字体（推荐）

1. 打开 Cursor 设置：
   - 按 `Ctrl + ,` 打开设置
   - 或点击 File → Preferences → Settings

2. 搜索 `terminal.integrated.fontFamily`

3. 设置为以下字体之一（按优先级）：
   ```
   "Consolas, 'Microsoft YaHei', 'SimHei', monospace"
   ```
   或
   ```
   "'Cascadia Code', 'Microsoft YaHei', monospace"
   ```
   或
   ```
   "'Fira Code', 'Microsoft YaHei', monospace"
   ```

### 方案 2：检查系统字体

确保 Windows 系统已安装中文字体：
1. 打开"设置" → "个性化" → "字体"
2. 确保安装了以下字体之一：
   - Microsoft YaHei（微软雅黑）
   - SimHei（黑体）
   - SimSun（宋体）

### 方案 3：使用 Windows Terminal（推荐）

如果 Git Bash 仍有问题，可以：

1. 安装 Windows Terminal（Windows 11 通常已预装）
2. 在 Cursor 设置中，将默认终端改为 Windows Terminal
3. Windows Terminal 对中文支持更好

### 方案 4：测试中文显示

在终端中运行以下命令测试：

```bash
# 测试基本中文输出
echo "测试中文：你好世界"

# 测试 Git 中文文件名
git status

# 测试文件列表
ls -la

# 测试环境变量
echo $LANG
echo $LC_ALL
```

### 方案 5：检查 Windows 区域设置

1. 打开"设置" → "时间和语言" → "语言和区域"
2. 确保"区域格式"设置为"中文(简体，中国)"
3. 点击"管理语言设置" → "更改系统区域设置"
4. 确保选择了"中文(简体，中国)"
5. 如果可用，勾选"Beta: 使用 Unicode UTF-8 提供全球语言支持"
6. 重启计算机

## 快速测试命令

运行以下命令检查配置：

```bash
# 检查编码环境变量
echo "LANG=$LANG"
echo "LC_ALL=$LC_ALL"

# 测试中文输出
echo "中文测试：你好，世界！"

# 检查 Git 配置
git config --global --get core.quotepath
git config --global --get gui.encoding

# 测试文件操作（如果有中文文件名）
ls -la | grep -E "[\u4e00-\u9fa5]"
```

## 常见问题

### Q: 为什么配置了还是乱码？
A: 可能是终端字体不支持中文。请按照"方案 1"手动设置支持中文的字体。

### Q: 某些命令输出是乱码，但其他正常？
A: 可能是特定程序的编码设置问题。尝试：
```bash
export LC_ALL=zh_CN.UTF-8
export LANG=zh_CN.UTF-8
```

### Q: Git 命令输出中文文件名是乱码？
A: 确保已设置：
```bash
git config --global core.quotepath false
```

### Q: 如何永久解决？
A: 
1. 确保 `.bash_profile` 文件存在并包含编码设置
2. 在 Cursor 设置中配置支持中文的字体
3. 重启 Cursor 使配置生效

## 验证步骤

1. **重启 Cursor**（完全关闭后重新打开）
2. **打开新终端**
3. **运行测试命令**：
   ```bash
   echo "中文测试：你好世界"
   ```
4. **如果显示正常**：配置成功 ✅
5. **如果仍显示乱码**：按照"方案 1"设置字体

## 相关文件

- Git Bash 配置：`C:\Users\douha\.bash_profile`
- Cursor 设置：`C:\Users\douha\AppData\Roaming\Cursor\User\settings.json`

