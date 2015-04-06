#!/bin/bash

# stop all node services
forever stopall

# remove all client/server files
sudo rm -rf /home/ubuntu/public/client
sudo rm -rf /home/ubuntu/public/server

# make fresh directories
mkdir /home/ubuntu/public/client
mkdir /home/ubuntu/public/server

