// const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const userInformation = require('./webserver/models/registerusermodel');

module.exports = function(passport) {
// serialize user
passport.serializeUser(function(user, done) {
  // console.log('serialized');
  done(null, user.id);
});

// Deserialize user
passport.deserializeUser(function(id, done) {
  // console.log('deserializeUser');
  userInformation.findById(id, function(err, user) {
    done(err, user);
  });
});

// Strategy for login
passport.use('login-strategy', new LocalStrategy(
  function(username, password, done) {
    userInformation.findOne({ userName: username }, function(err, user) {
      if (err) { return done(err); }
      if (!user) {
        return done(null, false);
      }
      if (user.password !== password) {
        return done(null, false);
      }
      return done(null, user);
    });
  }
));
};
