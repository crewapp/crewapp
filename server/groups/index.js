'use strict';
var router = require('express').Router();

router.post('/', function(req, res){
  var username = req.body.username;
  var token = req.body.token;
  var response;

  if(token === undefined || username === undefined){
    response = {
      response: 'failed',
      status: 'credentials not supplied'
    };
  }else if(token === '1010' && username === 'test'){
    response = {
      response: 'success',
      group: 'crying panda'
    };
  }else{
    response = {
      response: 'failed',
      status: 'invalid credentials'
    };
  }
  res.json(response);
});

router.post('/leave', function(req, res){
  var username = req.body.username;
  var token = req.body.token;
  var response;

  if(token === undefined || username === undefined){
    response = {
      response: 'failed',
      status: 'credentials not supplied'
    };
  }else if(token === '1010' && username === 'test'){
    response = {
      response: 'success',
      group: null
    };
  }else{
    response = {
      response: 'failed',
      status: 'invalid credentials'
    };
  }
  res.json(response);
});

router.post('/join', function(req, res){
  var username = req.body.username;
  var token = req.body.token;
  var response;

  if(token === undefined || username === undefined){
    response = {
      response: 'failed',
      status: 'credentials not supplied'
    };
  }else if(token === '1010' && username === 'test'){
    response = {
      response: 'success',
      group: 'dying turtle'
    };
  }else{
    response = {
      response: 'failed',
      status: 'invalid credentials'
    };
  }
  res.json(response);
});

router.post('/messages', function(req, res){
  var username = req.body.username;
  var token = req.body.token;
  var response;

  if(token === undefined || username === undefined){
    response = {
      response: 'failed',
      status: 'credentials not supplied'
    };
  }else if(token === '1010' && username === 'test'){
    // pull only info from user group
    response = {
      response: 'success',
      group: 'dying turtle',
      messages: [
        {
          'username': 'arian',
          'message': 'hello guys'
        },
        {
          'username': 'poppin3000',
          'message': 'i love you guys'
        },
        {
          'username': 'rkho',
          'message': 'testing!!'
        }
      ]
    };
  }else{
    response = {
      response: 'failed',
      status: 'invalid credentials'
    };
  }
  res.json(response);
});

module.exports = router;
