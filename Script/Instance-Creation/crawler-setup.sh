#!/bin/bash
sudo apt update
sudo pip3 install tweepy couchdb

sudo nohup python3 /home/ubuntu/CCC_ASS2-TheDeadlySins/TwitterCrawler/tweetsCrawler.py $1 &
