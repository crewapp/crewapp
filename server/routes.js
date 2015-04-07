var Database = require ('./database/config.js');

var router = require('express').Router();

// Add new user account to database
// app.post('/api/addnewuser', function(req, res){
//   Database.Users.create ({
//     name: req.body.username
//   })
// });

// Add new message to database
router.route('/api/message').post(function(req, res){
  Database.Messages.create ({
    message: req.body.message,
    name: req.body.name
  })
});

router.route('/api/message').get(function(req, res){
  Database.Messages.findAll({
    limit: 50
  }).success(function(data){
    res.json(data);
  })
});


module.exports = router;