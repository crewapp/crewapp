'use strict';
var router = require('express').Router();
var db = require('../database');
// var bcrypt = require('bcrypt-nodejs');
var helper = require('./../helper');

router.post('/update', function(req, res){
  var fbid = req.body.id;
  var name = req.body.name;
  var gender = req.body.gender;
  var picture = req.body.picture;
  var token = req.body.token;

  if(fbid === undefined){
    res.json({
      response: 'failed',
      status: 'credentials not supplied'});
  }else{
    db.User
      .find({where: {fbid: fbid}})
      .then(function(dbUser){
        if(dbUser === null){
          db.User
            .create({
              name: name,
              fbid: fbid,
              gender: gender,
              token: token,
              picture: picture
            }).then(function(user){
              helper.findGroup(user, function(group){

                db.GroupHistory.create({user_id: user.id, group_id: group.id})
                  .then(function(){
                    user.update({group_id: group.id}).then(function(){
                      res.json({
                        response: 'success',
                        token: user.token,
                        question: user.question,
                        group: group.groupname
                      });
                    });

                  });
              });
            });
        }else {
          dbUser.update({
            name: name,
            fbid: fbid,
            gender: gender,
            token: token,
            picture: picture
          }).then(function(dbUser){
            db.Group.find({
              where: {
                id: dbUser.group_id
              }
            }).then(function(group){
              var groupname = null;

              if(group !== null){
                groupname = group.groupname;
              }
              res.json({
                response: 'success',
                question: dbUser.question,
                group: groupname
              });
            });
          });
        }
      });
  }
});

// Switched to Facebook Auth!

// router.post('/signup', function(req, res){
//   var username = req.body.username;
//   var password = req.body.password;

//   db.User
//     .find({where: {username: username}})
//     .then(function(dbUser){

//       if(username === undefined || password === undefined){
//         res.json({
//           response: 'failed',
//           status: 'credentials not supplied'
//         });
//       }else if(dbUser === null){

//         bcrypt.hash(password, null, null, function(err, hash) {

//           helper.genToken(function(token){

//             db.User
//               .create({username: username, password: hash, token: token})
//               .then(function(user){

                // helper.findGroup(user, function(group){

                //   db.GroupHistory.create({user_id: user.id, group_id: group.id})
                //     .then(function(){

                //       user.update({group_id: group.id}).then(function(){
                //         res.json({
                //           response: 'success',
                //           token: user.token,
                //           group: group.groupname
                //         });
                //       });

                //     });
                // });
//               });
//           });
//         });

//       }else{
//         res.json({
//           response: 'failed',
//           status: 'user exists'
//         });
//       }
//     });
// });

// router.post('/signin', function(req, res){
//   var username = req.body.username;
//   var password = req.body.password;

//   db.User
//     .find({where: {username: username}})
//     .then(function(dbUser){

//       if(username === undefined || password === undefined){
//         res.json({
//           response: 'failed',
//           status: 'credentials not supplied'
//         });
//       }else if(dbUser === null){
//         res.json({
//           response: 'failed',
//           status: 'user does not exist'
//         });
//       }else {
//         bcrypt.compare(password, dbUser.password, function(err, valid) {
//           if(valid === true){
//             helper.genToken(function(newToken){
//               dbUser.update({token: newToken}).then(function(updatedUser){
//                 db.Group.find({
//                   where: {
//                     id: updatedUser.group_id
//                   }
//                 }).then(function(group){
//                   var groupname = null;
//                   if(group !== null){
//                     groupname = group.groupname;
//                   }
//                   res.json({
//                     response: 'success',
//                     token: newToken,
//                     group: groupname
//                   });
//                 });
//               });
//             });
//           }else{
//             res.json({
//               response: 'failed',
//               status: 'invalid credentials'
//             });
//           }
//         });
//       }
//     });
// });

module.exports = router;
