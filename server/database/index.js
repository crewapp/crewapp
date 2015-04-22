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
  fbid: {
    type: Sequelize.INTEGER,
    unique: true
  },
  username: {
    type: Sequelize.STRING,
    unique: true
  },
  gender: Sequelize.STRING,
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
  groupname: {
    type: Sequelize.STRING,
    unique: true
  },
  groupkey: Sequelize.STRING
});

var GroupHistory = sequelize.define('group_history', {
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

// Group.hasMany(User);
// User.hasMany(Message);
// Message.belongsTo(Group);

// force: true drops all tables
// which is good for testing, and bad for production
sequelize.sync({force: true});


exports.Sequelize = Sequelize;
exports.User = User;
exports.Message = Message;
exports.Group = Group;
exports.GroupHistory = GroupHistory;


