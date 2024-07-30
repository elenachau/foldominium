#!/bin/bash

echo 'run application_start.sh: ' >> /home/ec2-user/foldominium/website/deploy.log
# foldominium is the name as stored in pm2 process
echo 'pm2 restart foldominium' >> /home/ec2-user/foldominium/website/deploy.log
pm2 restart foldominium >> /home/ec2-user/foldominium/website/deploy.log