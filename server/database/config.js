var Sequelize = require('sequelize');

var sequelize = new Sequelize(process.env['CLEAR_DB_DATABASE'], process.env['CLEAR_DB_USER'], process.env['CLEAR_DB_PW'], {
  host: process.env['CLEAR_DB_SERVER'],
  dialect: 'mysql'
});)



var Messages = sequelize.define('Messages', {
  message: Sequelize.TEXT,
  timestamp: Sequelize.DATE,
});

var Users = sequelize.define('Users', {
  name: Sequelize.STRING
})

Users.hasMany(Messages);
Messages.hasOne(Users);

module.exports = Database;