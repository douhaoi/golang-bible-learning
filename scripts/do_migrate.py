#!/usr/bin/env python3
"""
将平铺的内容文件重构为章节文件夹结构
"""
import os
import shutil

def main():
    content_dir = 'src/content'
    
    print('📂 开始重构目录结构...\n')
    
    # 创建章节文件夹 ch1-ch14
    for i in range(1, 15):
        ch_dir = os.path.join(content_dir, f'ch{i}')
        os.makedirs(ch_dir, exist_ok=True)
        print(f'✅ 创建目录: ch{i}/')
    
    # 创建 images 目录
    images_dir = os.path.join(content_dir, 'images')
    os.makedirs(images_dir, exist_ok=True)
    print('✅ 创建目录: images/')
    
    print('\n📄 复制文件到章节文件夹...\n')
    
    # 获取所有匹配的文件
    files = []
    for f in os.listdir(content_dir):
        if f.endswith('.md') and '-' in f and f[0].isdigit():
            files.append(f)
    
    files.sort()
    count = 0
    
    # 复制文件
    for file in files:
        # 解析文件名 (例如: 1-1.md)
        name_without_ext = file[:-3]  # 移除 .md
        parts = name_without_ext.split('-')
        
        if len(parts) == 2:
            chapter, section = parts
            try:
                # 验证是数字
                int(chapter)
                int(section)
                
                # 新文件名: ch1-01.md
                section_padded = section.zfill(2)
                new_name = f'ch{chapter}-{section_padded}.md'
                
                old_path = os.path.join(content_dir, file)
                new_path = os.path.join(content_dir, f'ch{chapter}', new_name)
                
                shutil.copy2(old_path, new_path)
                print(f'  {file} → ch{chapter}/{new_name}')
                count += 1
            except ValueError:
                continue
    
    print(f'\n✨ 迁移完成！复制了 {count} 个文件')
    print('\n⚠️  注意：')
    print('1. 旧文件已复制到新位置，原文件仍保留')
    print('2. 测试无误后，可删除根目录下的旧文件')
    print('3. 运行 `node scripts/download-images.js` 下载图片资源')
    print('4. 运行 `pnpm dev` 测试')

if __name__ == '__main__':
    main()

