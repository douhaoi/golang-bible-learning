#!/bin/bash

# 将平铺的内容文件重构为章节文件夹结构
# 格式: 1-1.md → ch1/ch1-01.md

set -e

CONTENT_DIR="src/content"

echo "📂 开始重构目录结构..."
echo ""

# 创建章节文件夹
for i in {1..14}; do
  mkdir -p "$CONTENT_DIR/ch$i"
  echo "✅ 创建目录: ch$i/"
done

# 创建 images 目录
mkdir -p "$CONTENT_DIR/images"
echo "✅ 创建目录: images/"
echo ""

# 移动文件
echo "📄 移动文件到对应章节..."
for file in "$CONTENT_DIR"/*.md; do
  basename=$(basename "$file")
  
  # 跳过非章节文件
  if [[ ! $basename =~ ^([0-9]+)-([0-9]+)\.md$ ]]; then
    continue
  fi
  
  chapter="${BASH_REMATCH[1]}"
  section="${BASH_REMATCH[2]}"
  
  # 格式化为两位数的小节号
  section_padded=$(printf "%02d" "$section")
  
  new_name="ch${chapter}-${section_padded}.md"
  new_path="$CONTENT_DIR/ch${chapter}/$new_name"
  
  cp "$file" "$new_path"
  echo "  $basename → ch${chapter}/$new_name"
done

echo ""
echo "✨ 目录重构完成！"
echo ""
echo "⚠️  注意事项："
echo "1. 旧文件已复制到新位置，原文件保留"
echo "2. 需要手动删除根目录下的旧文件（1-1.md, 1-2.md 等）"
echo "3. 运行 'node scripts/download-images.js' 下载图片资源"
echo "4. 本地测试: pnpm dev"
echo ""

