'use strict';
var crypto = require('crypto');

var genToken = function(cb){
  crypto.randomBytes(127, function(ex, buf) {
    var string = buf.toString('hex');
    cb(string);
  });
};

module.exports.genToken = genToken;
