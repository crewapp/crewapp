'use strict';
var crypto = require('crypto');
var generateName = require('sillyname');
var db = require('../database');

var genToken = function(cb){
  return crypto.randomBytes(127, function(ex, buf) {
    var string = buf.toString('hex');
    return cb(string);
  });
};

var genRoomname = function(cb) {
  var name = generateName();
  return cb(name);
};

var createUniqueRoom = function(cb) {

  var createRoom = function(gen_name){
    db.Group
      .create({groupname: gen_name})
      .then(function(group){
        cb(group);
      })
      .catch(function(error) {
        if(error && error.errors && error.errors[0].type === 'unique violation'){
          genRoomname(createRoom);
        }
      });
  };
  genRoomname(createRoom);
};


var findGroup = function(dbUser, cb){

  db.User.findAll({
    attributes: [
      'group_id',
      [db.Sequelize.fn('count', db.Sequelize.col('group_id')), 'count']
    ],
    where: ['group_id IS NOT NULL'],
    group: ['users.group_id'],
    having: ['count < ?', 6]
  }).then(function (result) {
    if(result.length === 0){
      createUniqueRoom(function(group){
        cb(group);
      });
    }else{
      var current_id = null;

      var grouper = function(group_result){
        if(group_result === null){
          db.Group.find({where: {id: result[current_id].group_id}})
            .then(function(group){
              cb(group);
            });
        }else if(current_id === result.length-1){
          createNew();
        }
      };

      for(var i = 0; i < result.length; i++){
        current_id = i;
        db.GroupHistory.find({
          where: {
            group_id: result[i].group_id,
            user_id: dbUser.id
          }
        })
        .then(grouper);
      }


      var createNew = function(){
        createUniqueRoom(function(group){
          cb(group);
        });
      };
    }
  });
};



module.exports.genToken = genToken;
module.exports.findGroup = findGroup;
module.exports.createUniqueRoom = createUniqueRoom;
