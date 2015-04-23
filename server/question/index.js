'use strict';
var router = require('express').Router();
var db = require('./../database');
// var helper = require('./../helper');

router.get('/random', function(req, res){

  db.Question.findAll({
    order: db.Sequelize.fn('RAND'),
    limit: 6
  }).then(function(questions){
    res.json(questions);
  });

});

module.exports = router;
