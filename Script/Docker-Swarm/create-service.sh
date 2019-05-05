
# From lecture demo of creating services on a manager node. 
# 
docker-machine ssh manager docker service create --replicas 3 -p 8083:80 --name nginx nginx:alpinejizwos2x10rdksimssd8ewclv

