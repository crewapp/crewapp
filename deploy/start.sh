#!/bin/bash

# start forever with port 2368
cd /home/ubuntu/public/server/
PORT=2368 forever start server.js

