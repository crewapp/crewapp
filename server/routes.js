var Database = require ('.database/config.js');

module.exports = function(app){
  app.post('/addnewuser', function(req, res){
    Database.Users.create ({
      name: req.body.username
    })
  });

  app.post('/addnewmessage', function(req, res){
    Database.Messages.create ({
      message: req.body.message,
      // timestamp
      // userid?
    })
  })
}