#!/bin/bash
echo 'run after_install.sh: ' >> /home/ec2-user/foldominium/website/deploy.log

echo 'cd /home/ec2-user/foldominium/website' >> /home/ec2-user/foldominium/website/deploy.log
cd /home/ec2-user/foldominium/website >> /home/ec2-user/foldominium/website/deploy.log

echo 'npm install' >> /home/ec2-user/foldominium/website/deploy.log 
npm install >> /home/ec2-user/foldominium/website/deploy.log