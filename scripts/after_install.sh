#!/bin/bash
log_message() {
    echo "[$(date +'%Y-%m-%d %H:%M:%S')] *$1" >> /home/ec2-user/foldominium/website/deploy.log
}

echo 'run after_install.sh: ' >> /home/ec2-user/foldominium/website/deploy.log

log_message 'cd /home/ec2-user/foldominium/website'
cd /home/ec2-user/foldominium/website >> /home/ec2-user/foldominium/website/deploy.log

log_message 'npm install' 
npm install >> /home/ec2-user/foldominium/website/deploy.log