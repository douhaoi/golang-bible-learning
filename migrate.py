#!/usr/bin/env python3
"""
目录重构脚本：将平铺的内容文件移动到章节文件夹
使用方法：python3 migrate.py
"""

import os
import shutil
from pathlib import Path

# 获取项目根目录
project_root = Path(__file__).parent
content_dir = project_root / 'src' / 'content'

print('📂 开始重构目录结构...\n')

# 创建章节文件夹 ch1-ch14
for i in range(1, 15):
    chapter_path = content_dir / f'ch{i}'
    if not chapter_path.exists():
        chapter_path.mkdir(parents=True, exist_ok=True)
        print(f'✅ 创建目录: ch{i}/')
    else:
        print(f'⏭️  目录已存在: ch{i}/')

# 创建 images 目录
images_path = content_dir / 'images'
if not images_path.exists():
    images_path.mkdir(parents=True, exist_ok=True)
    print('✅ 创建目录: images/')
else:
    print('⏭️  目录已存在: images/')

print('\n📄 复制文件到章节文件夹...\n')

# 获取所有匹配的文件
files = sorted([f for f in os.listdir(content_dir) 
                if f.endswith('.md') and '-' in f and f[0].isdigit()])

success_count = 0
skip_count = 0

# 复制文件
for file in files:
    # 解析文件名 (例如: 1-1.md)
    parts = file[:-3].split('-')  # 移除 .md
    
    if len(parts) == 2:
        chapter, section = parts
        try:
            # 验证是数字
            int(chapter)
            int(section)
            
            # 新文件名: ch1-01.md
            section_padded = section.zfill(2)
            new_name = f'ch{chapter}-{section_padded}.md'
            
            old_path = content_dir / file
            new_path = content_dir / f'ch{chapter}' / new_name
            
            # 检查目标文件是否已存在
            if new_path.exists():
                print(f'  ⏭️  跳过（已存在）: {file} → ch{chapter}/{new_name}')
                skip_count += 1
            else:
                shutil.copy2(old_path, new_path)
                print(f'  ✅ {file} → ch{chapter}/{new_name}')
                success_count += 1
        except ValueError:
            continue

print(f'\n✨ 迁移完成！')
print(f'   成功: {success_count} 个')
if skip_count > 0:
    print(f'   跳过: {skip_count} 个')

print('\n🎯 下一步：')
print('1. 刷新浏览器（http://localhost:3000），检查内容是否能正常加载')
print('2. 如果正常，可以删除旧文件：')
print('   cd src/content && rm [0-9]*-[0-9]*.md')
print('3. 下载图片资源：')
print('   python3 scripts/download-images.py  # 或 node scripts/download-images.js')
print('4. 提交更改：')
print('   git add . && git commit -m "重构目录结构为章节文件夹"')
print('')

