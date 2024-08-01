#!/bin/bash
log_message() {
    printf "\n[%s] *%s" "$(date +'%Y-%m-%d %H:%M:%S')" "$1" >> /home/ec2-user/foldominium/website/deploy.log
}

printf "\n========================================"
echo 'run application_start.sh:' >> /home/ec2-user/foldominium/website/deploy.log

log_message 'cd /home/ec2-user/foldominium/website'
cd /home/ec2-user/foldominium/website >> /home/ec2-user/foldominium/website/deploy.log

log_message 'npm run build'
sudo npm run build >> /home/ec2-user/foldominium/website/deploy.log 2>&1

# foldominium is the name as stored in pm2 process
log_message 'sudo pm2 restart foldominium'
sudo pm2 restart foldominium >> /home/ec2-user/foldominium/website/deploy.log

printf "\n========================================"