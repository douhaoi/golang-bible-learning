#!/bin/bash

# Start claude-mem-worker with pm2
# This script ensures the claude-mem worker is always running

echo "Starting claude-mem-worker..."

# Check if pm2 is running
if ! pgrep -f "pm2" > /dev/null; then
    echo "Starting pm2 daemon..."
    pm2 resurrect
fi

# Check if claude-mem-worker is already running
if pm2 list | grep -q "claude-mem-worker.*online"; then
    echo "claude-mem-worker is already running"
else
    echo "Starting claude-mem-worker..."
    cd /Users/douhao
    pm2 start /usr/local/bin/bun --name claude-mem-worker -- /Users/douhao/.claude/plugins/marketplaces/thedotmack/plugin/scripts/worker-service.cjs start
    pm2 save
fi

echo "claude-mem-worker started successfully!"