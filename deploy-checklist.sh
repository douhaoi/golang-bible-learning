#!/bin/bash

# GitHub Pages 部署前检查脚本

echo "🔍 检查部署文件..."

# 检查必要文件是否存在
files=(
  "pnpm-lock.yaml"
  ".github/workflows/deploy.yml"
  "vite.config.ts"
  "src/main.tsx"
  "public/.nojekyll"
)

missing_files=()
for file in "${files[@]}"; do
  if [ ! -f "$file" ]; then
    missing_files+=("$file")
  fi
done

if [ ${#missing_files[@]} -gt 0 ]; then
  echo "❌ 缺少必要文件："
  for file in "${missing_files[@]}"; do
    echo "  - $file"
  done
  exit 1
fi

echo "✅ 所有必要文件都存在"

# 检查文件是否被 git 跟踪
echo ""
echo "🔍 检查 Git 状态..."

untracked=()
for file in "${files[@]}"; do
  if ! git ls-files --error-unmatch "$file" > /dev/null 2>&1; then
    untracked+=("$file")
  fi
done

if [ ${#untracked[@]} -gt 0 ]; then
  echo "⚠️  以下文件未被 Git 跟踪："
  for file in "${untracked[@]}"; do
    echo "  - $file"
  done
  echo ""
  echo "运行以下命令添加文件："
  echo "  git add ${untracked[@]}"
fi

# 显示待提交的更改
echo ""
echo "📝 待提交的更改："
git status --short

echo ""
echo "✨ 准备部署！"
echo ""
echo "执行以下命令部署到 GitHub Pages："
echo ""
echo "  git add ."
echo "  git commit -m \"配置 GitHub Pages 部署\""
echo "  git push origin main"
echo ""

