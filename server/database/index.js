var Sequelize = require('sequelize');

var dbconfig = {};
dbconfig.database = process.env.database || 'crew';
dbconfig.username = process.env.username || 'root';
dbconfig.password = process.env.password || '';
dbconfig.hostname = process.env.hostname || 'localhost';

var orm = new Sequelize(dbconfig.database, dbconfig.username, dbconfig.password, {
  host: dbconfig.hostname
});

var Messages = orm.define('messages', {
  message: Sequelize.TEXT,
  name: Sequelize.STRING
});

var Groups = orm.define('groups', {
});

Messages.sync();
Groups.sync();

exports.Messages = Messages;

