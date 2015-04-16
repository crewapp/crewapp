'use strict';
var router = require('express').Router();
var db = require('../database');
var bcrypt = require('bcrypt-nodejs');
var bluebird = require('bluebird');
var helper = require('./../helper');
bluebird.promisifyAll(bcrypt);

router.post('/signup', function(req, res){
  var username = req.body.username;
  var password = req.body.password;

  db.User
    .find({where: {username: username}})
    .then(function(dbUser){

      if(username === undefined || password === undefined){
        res.json({
          response: 'failed',
          status: 'credentials not supplied'
        });
      }else if(dbUser === null){

        bcrypt.hash(password, null, null, function(hash) {

          helper.genToken(function(token){

            db.User
              .create({username: username, password: hash, token: token})
              .then(function(user){

                helper.findGroup(user, function(group){

                  db.GroupHistory.create({user_id: user.id, group_id: group.id})
                    .then(function(){

                      user.update({group_id: group.id}).then(function(){
                        res.json({
                          response: 'success',
                          token: user.token,
                          group: group.groupname
                        });
                      });

                    });
                });
              });
          });
        });

      }else{
        res.json({
          response: 'failed',
          status: 'user exists'
        });
      }
    });
});

router.post('/signin', function(req, res){
  var username = req.body.username;
  var password = req.body.password;

  db.User
    .find({where: {username: username}})
    .then(function(dbUser){

      if(username === undefined || password === undefined){
        res.json({
          response: 'failed',
          status: 'credentials not supplied'
        });
      }else if(dbUser === null){
        res.json({
          response: 'failed',
          status: 'user does not exist'
        });
      }else {
        bcrypt.compare(password, dbUser.password, function(err, valid) {
          if(valid === true){
            helper.genToken(function(newToken){
              dbUser.update({token: newToken}).then(function(){
                res.json({
                  response: 'success',
                  token: newToken,
                  group: 'crying panda'
                });
              });
            });
          }else{
            res.json({
              response: 'failed',
              status: 'invalid credentials'
            });
          }
        });
      }
    });
});

module.exports = router;
