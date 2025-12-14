#!/bin/bash
# 测试主机名显示

echo "=== 主机名测试 ==="
echo "COMPUTERNAME: $COMPUTERNAME"
echo "HOSTNAME: $HOSTNAME"
echo ""
echo "当前提示符: $PS1"
echo ""
echo "测试提示符显示效果："
echo "$PS1" | sed 's/\\\[[^]]*\]//g' | sed 's/\\u/用户名/g' | sed 's/\\h/主机名/g' | sed 's/\\w/目录/g'

