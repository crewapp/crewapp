var Database = require ('./database/config.js');

var router = require('express').Router();


// Add new user account to database
// app.post('/api/addnewuser', function(req, res){
//   Database.Users.create ({
//     name: req.body.username
//   })
// });

// Add new message to database
// router.route('/message').post(function(req, res){
//   Database.Messages.create ({
//     message: req.body.message,
//     name: req.body.name
//   }).success(function(data){
//     res.end();
//   });
// });

// router.route('/message').get(function(req, res){
//   Database.Messages.findAll({
//     limit: 50
//   }).success(function(data){
//     res.json(data);
//   });
// });

// router.route('/users').post(function(req, res){
//   Database.Users.create ({
//     name: req.body.name
//   }).success(function(data){
//     res.end();
//   });
// });

// router.route('/users').get(function(req, res){
//   Database.Users.findAll().success(function(data){
//     res.json(data);
//   });
// });


module.exports = router;
