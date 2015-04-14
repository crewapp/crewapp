'use strict';
var router = require('express').Router();
var db = require('../database');

router.post('/signup', function(req, res){
  var username = req.body.username;
  var password = req.body.password;

  db.User
    .find({where: {username: username}})
    .then(function(results){
      var response;
      if(username === undefined || password === undefined){
        response  = {
          response: 'failed',
          status: 'credentials not supplied'
        };
      }else if(results === null && username !== 'test'){
        response = {
          response: 'success',
          token: 1010,
          group: 'crying panda'
        };
      }else{
        response = {
          response: 'failed',
          status: 'user exists'
        };
      }
      res.json(response);
    });
});

router.post('/signin', function(req, res){
  var username = req.body.username;
  var password = req.body.password;

  db.User
    .find({where: {username: username}})
    .then(function(results){
      var response;
      if(username === undefined || password === undefined){
        response  = {
          response: 'failed',
          status: 'credentials not supplied'
        };
      }else if(results === null && username !== 'test'){
        response = {
          response: 'failed',
          status: 'user does not exist'
        };
      }else if(password !== 'testing'){
        response = {
          response: 'failed',
          status: 'invalid credentials'
        };
      }else{
        response = {
          response: 'success',
          token: '1010',
          group: 'crying panda'
        };
      }
      res.json(response);

    });
});

module.exports = router;
