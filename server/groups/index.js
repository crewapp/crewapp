'use strict';
var router = require('express').Router();
var db = require('./../database');
var helper = require('./../helper');

router.post('/', function(req, res){
  var username = req.body.username;
  var token = req.body.token;

  if(token === undefined || username === undefined){
    res.json({
      response: 'failed',
      status: 'credentials not supplied'
    });
  }else {
    db.User.find({
      where: {
        username: username,
        token: token
      }
    }).then(function(user){
      if(user !== null){
        db.Group.find({
          where: {
            id: user.group_id
          }
        }).then(function(group){
          var groupname = null;

          if(group !== null){
            groupname = group.groupname;
          }
          res.json({
            response: 'success',
            group: groupname
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

router.post('/leave', function(req, res){
  var username = req.body.username;
  var token = req.body.token;

  if(token === undefined || username === undefined){
    res.json({
      response: 'failed',
      status: 'credentials not supplied'
    });
  }else{
    db.User.find({
      where: {
        username: username,
        token: token
      }
    }).then(function(user){
      if(user === null){
        res.json({
          response: 'failed',
          status: 'invalid credentials'
        });
      }else{
        user.update({group_id: null}).then(function(){
          res.json({
            response: 'success',
            group: null
          });
        });
      }
    });
  }
});

router.post('/join', function(req, res){
  var username = req.body.username;
  var token = req.body.token;

  if(token === undefined || username === undefined){
    res.json({
      response: 'failed',
      status: 'credentials not supplied'
    });
  }else{
    db.User.find({
      where: {
        username: username,
        token: token
      }
    }).then(function(user){
      if(user === null){
        res.json({
          response: 'failed',
          status: 'invalid credentials'
        });
      }else if(user.group_id !== null){
        res.json({
          response: 'failed',
          status: 'already in group'
        });
      }else {
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
      }
    });
  }
});

router.post('/messages', function(req, res){
  var username = req.body.username;
  var token = req.body.token;

  if(token === undefined || username === undefined){
    res.json({
      response: 'failed',
      status: 'credentials not supplied'
    });
  }else{
    db.User.find({
      where: {
        username: username,
        token: token
      }
    }).then(function(user){
      if(user !== null){
        db.Group.find({
          where: {
            id: user.group_id
          }
        }).then(function(group){
          var groupname = null;

          if(group !== null){
            groupname = group.groupname;
          }
          res.json({
            response: 'success',
            group: groupname,
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

module.exports = router;
