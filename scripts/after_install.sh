#!/bin/bash
log_message() {
    printf "\n[%s] *%s" "$(date +'%Y-%m-%d %H:%M:%S')" "$1" >> /home/ec2-user/foldominium/website/deploy.log
}

printf "\n========================================"
echo 'run after_install.sh: ' >> /home/ec2-user/foldominium/website/deploy.log

log_message 'cd /home/ec2-user/foldominium/website'
cd /home/ec2-user/foldominium/website >> /home/ec2-user/foldominium/website/deploy.log

log_message 'npm install' 
npm install >> /home/ec2-user/foldominium/website/deploy.log
printf "\n========================================"