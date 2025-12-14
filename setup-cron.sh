#!/bin/bash

# Setup cron job to auto-start claude-mem-worker on reboot

# Create a temporary crontab file
TEMP_CRON=$(mktemp)

# Export current crontab
crontab -l > "$TEMP_CRON" 2>/dev/null || echo "# New crontab" > "$TEMP_CRON"

# Check if the entry already exists
if grep -q "start-claude-worker.sh" "$TEMP_CRON"; then
    echo "Cron job already exists"
else
    # Add the cron job to run on reboot
    echo "@reboot /Users/douhao/code/workspace/golang-bible-learning/start-claude-worker.sh >> /Users/douhao/claude-worker-startup.log 2>&1" >> "$TEMP_CRON"

    # Install the new crontab
    crontab "$TEMP_CRON"
    echo "Cron job added successfully!"
fi

# Clean up
rm "$TEMP_CRON"

echo "Current crontab:"
crontab -l