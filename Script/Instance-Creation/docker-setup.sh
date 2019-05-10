#!/bin/bash
sudo mkdir /etc/systemd/system/docker.service.d/
cd /etc/systemd/system/docker.service.d/
sudo touch /etc/systemd/system/docker.service.d/http-proxy.conf
sudo bash -c 'echo [Service] >> http-proxy.conf'
sudo bash -c 'echo Environment=\"HTTP_PROXY=http://wwwproxy.unimelb.edu.au:8000\" >> http-proxy.conf'
sudo touch /etc/systemd/system/docker.service.d/https-proxy.conf
sudo bash -c 'echo [Service] >> https-proxy.conf'
sudo bash -c 'echo Environment=\"HTTPS_PROXY=http://wwwproxy.unimelb.edu.au:8000\" >> https-proxy.conf'

sleep 5
sudo systemctl daemon-reload && sudo systemctl restart docker
sleep 20
sudo docker pull couchdb:2.3.0