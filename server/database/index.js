'use strict';
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
    type: Sequelize.BIGINT,
    unique: true
  },
  username: {
    type: Sequelize.STRING,
    unique: true
  },
  question: {
    type: Sequelize.BOOLEAN,
    defaultValue: false
  },
  name: Sequelize.TEXT,
  picture: Sequelize.TEXT,
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

var Question = sequelize.define('question', {
  choiceOne: Sequelize.STRING,
  choiceTwo: Sequelize.STRING
});

var QuestionResponse = sequelize.define('response', {
  user_id: {
    type: Sequelize.INTEGER,
    references: 'users',
    referencesKey: 'id'
  },
  question_id: {
    type: Sequelize.INTEGER,
    references: 'questions',
    referencesKey: 'id'
  },
  question_choice: Sequelize.INTEGER

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
sequelize.sync({force: true}).then(function(){
  Question.bulkCreate(
  [
    { choiceOne: 'Mac',       choiceTwo: 'Windows' },
    { choiceOne: 'Tacos',     choiceTwo: 'Burgers' },
    { choiceOne: 'Stanford',  choiceTwo: 'Cal' },
    { choiceOne: 'Five Guys', choiceTwo: 'In-n-out' },
    { choiceOne: 'Bart',      choiceTwo: 'Muni' },
    { choiceOne: 'Walmart',   choiceTwo: 'Target' },
    { choiceOne: 'Apple',     choiceTwo: 'Google' },
    { choiceOne: 'Netflix',   choiceTwo: 'Amazon' },
    { choiceOne: 'Uber',      choiceTwo: 'Lyft' },
    { choiceOne: 'Dive Bar',  choiceTwo: 'Club' },
    { choiceOne: 'Five Guys', choiceTwo: 'In-n-out' },
    { choiceOne: 'Coke',      choiceTwo: 'Pepsi'}
  ]).then(function(){
    console.log('completed adding base questions!');
  });
});



exports.Sequelize = Sequelize;
exports.User = User;
exports.Message = Message;
exports.Group = Group;
exports.GroupHistory = GroupHistory;
exports.Question = Question;
exports.QuestionResponse = QuestionResponse;

