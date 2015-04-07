var Database = require ('./database/config.js');

// Add new user account to database
// app.post('/api/addnewuser', function(req, res){
//   Database.Users.create ({
//     name: req.body.username
//   })
// });

// Add new message to database
app.post('/api/addnewmessage', function(req, res){
  Database.Messages.create ({
    message: req.body.message,
    name: req.body.name
  })
});