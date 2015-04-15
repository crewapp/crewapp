var Sequelize = require('sequelize');

var dbconfig = {};
dbconfig.database = process.env.database || 'crew';
dbconfig.username = process.env.username || 'root';
dbconfig.password = process.env.password || '';
dbconfig.hostname = process.env.hostname || 'localhost';

var sequelize = new Sequelize(dbconfig.database, dbconfig.username, dbconfig.password, {
  host: dbconfig.hostname
});

var User = sequelize.define('users', {
  username: {
    type: Sequelize.STRING, 
    unique: true
  },
  password: Sequelize.STRING,
  token: {
    type: Sequelize.STRING,
    unique: true
  },
  group_id: {
    type: Sequelize.INTEGER,
    references: 'groups',
    referencesKey: 'id'
  }
});

var Message = sequelize.define('message', {
  message: Sequelize.STRING,
  group_id: {
    type: Sequelize.INTEGER,
    references: 'groups',
    referencesKey: 'id'
  },
  user_id: {
    type: Sequelize.INTEGER,
    references: 'users',
    referencesKey: 'id'
  }
});

var Group = sequelize.define('groups', {
  groupname: Sequelize.STRING,
  groupkey: Sequelize.STRING
});


// Group.hasMany(User);
// User.hasMany(Message);
// Message.belongsTo(Group);

// force: true drops all tables
// which is good for testing, and bad for production
sequelize.sync({force: true});



exports.User = User;
exports.Message = Message;
exports.Group = Group;


