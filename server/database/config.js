var Sequelize = require('sequelize');
var path = require('path');

var Messages = Sequelize.define('Messages', {
  message: Sequelize.TEXT,
  timestamp: Sequelize.DATE,
});

var Users = Sequelize.define('Users', {
  name: Sequelize.STRING
})

Users.hasMany(Messages);
Messages.hasOne(Users);