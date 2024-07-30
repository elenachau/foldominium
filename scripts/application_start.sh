#!/bin/bash
log_message() {
    echo "[$(date +'%Y-%m-%d %H:%M:%S')] *$1" >> /home/ec2-user/foldominium/website/deploy.log
}

log_message 'run application_start.sh:' 

log_message 'npm build'
npm build >> /home/ec2-user/foldominium/website/deploy.log

# foldominium is the name as stored in pm2 process
log_message 'pm2 restart foldominium'
pm2 restart foldominium >> /home/ec2-user/foldominium/website/deploy.log