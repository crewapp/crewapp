'use strict';
var router = require('express').Router();

router.post('/', function(req, res){
  var token = req.body.token;
  var response;

  if(token === undefined){
    response = {
      response: 'failed',
      status: 'credentials not supplied'
    };
  }else if(token === '1010'){
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
  var token = req.body.token;
  var response;

  if(token === undefined){
    response = {
      response: 'failed',
      status: 'credentials not supplied'
    };
  }else if(token === '1010'){
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
  var token = req.body.token;
  var response;

  if(token === undefined){
    response = {
      response: 'failed',
      status: 'credentials not supplied'
    };
  }else if(token === '1010'){
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

module.exports = router;
