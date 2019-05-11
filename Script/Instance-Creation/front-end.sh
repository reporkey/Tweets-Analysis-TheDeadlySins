#!/bin/bash
cd /home/ubuntu/CCC_ASS2-TheDeadlySins/CCCweb
sudo npm install 
sudo nohup node app.js $1 &
