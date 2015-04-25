#!/bin/bash

# stop all node services
forever stopall

# remove all client/server files
sudo rm -rf /home/ubuntu/public/server
sudo rm -rf /home/ubuntu/public/test

# make fresh directories
mkdir /home/ubuntu/public/server
mkdir /home/ubuntu/public/test

