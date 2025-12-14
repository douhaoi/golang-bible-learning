#!/bin/bash
# 目录重构脚本：将平铺的内容文件移动到章节文件夹

set -e

cd "$(dirname "$0")"

echo "📂 开始重构目录结构..."
echo ""

# 创建章节文件夹
cd src/content
for i in {1..14}; do
  mkdir -p "ch${i}"
  echo "✅ 创建目录: ch${i}/"
done

# 创建 images 目录
mkdir -p images
echo "✅ 创建目录: images/"
echo ""

echo "📄 复制文件到章节文件夹..."
echo ""

# 复制文件
count=0
for file in [0-9]*-[0-9]*.md; do
  if [ -f "$file" ]; then
    # 提取章节号和小节号
    chapter=$(echo "$file" | cut -d'-' -f1)
    section=$(echo "$file" | cut -d'-' -f2 | cut -d'.' -f1)
    
    # 格式化为两位数
    section_padded=$(printf "%02d" "$section")
    
    new_name="ch${chapter}-${section_padded}.md"
    new_path="ch${chapter}/${new_name}"
    
    cp "$file" "$new_path"
    echo "  ${file} → ${new_path}"
    count=$((count + 1))
  fi
done

echo ""
echo "✨ 迁移完成！复制了 ${count} 个文件"
echo ""
echo "🎯 下一步："
echo "1. 刷新浏览器，检查内容是否能正常加载"
echo "2. 如果正常，可以删除旧文件: rm [0-9]*-[0-9]*.md"
echo "3. 下载图片: node ../../scripts/download-images.js"
echo "4. 提交更改: git add . && git commit -m '重构目录结构'"
echo ""

