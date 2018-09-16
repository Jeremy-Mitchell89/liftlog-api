var mongoose = require('mongoose');
mongoose.set('debug',true);
mongoose.Promise = Promise;
mongoose.connect('mongodb://admin:admin123@ds039175.mlab.com:39175/warbler', {
  keepAlive: true,
  useNewUrlParser:true
});

module.exports.Log = require('./log');
module.exports.Movement = require('./movements');
module.exports.User = require('./user');