'use strict';
var router = require('express').Router();
var db = require('./../database');
var _ = require('lodash');
// var helper = require('./../helper');

router.get('/random', function(req, res){

  db.Question.findAll({
    order: db.Sequelize.fn('RAND'),
    limit: 6
  }).then(function(questions){
    res.json(questions);
  });

});

router.post('/set', function(req, res){
  // TODO: sanatize values coming in,
  // for now this will do.
  if(req.body.token === undefined || req.body.qres === undefined){
    res.json({
      response: 'failed',
      status: 'requirements not supplied'
    });
  }else{
    db.User.find({token: req.body.token})
      .then(function(dbUser){

        if(dbUser === null){
          res.json({
            response: 'failed',
            status: 'invalid credentials'
          });
        }else if(dbUser.question === true){
          res.json({
            response: 'failed',
            status: 'already answered questions'
          });
        }else {
          var userid = dbUser.id;

          _(req.body.qres).forEach(function(n) {
            n.user_id = userid;
          }).value();

          db.QuestionResponse.bulkCreate(req.body.qres)
            .then(function(){

              dbUser.update({question: true})
                .then(function(){
                  res.json({
                    response: 'success'
                  });
                });

            });
        }

      });
  }
});
module.exports = router;
