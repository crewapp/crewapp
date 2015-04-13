'use strict';
var router = require('express').Router();
var db = require('../database');

router.post('/signup', function(req, res){
  var username = req.body.username || 'username';
  var password = req.body.username || 'password';

  db.User
    .find({where: {username: username}})
    .then(function(results){
      if(results === null){
        /* to do */
        res.end('add: ' + password + ' & ' + username);
      }else{
        res.end(409);
      }
    });
});

module.exports = router;
