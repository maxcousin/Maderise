// load all the things we need
var LocalStrategy   = require('passport-local').Strategy;

// load up the user model
var models = require('../models');

// expose this function to our app using module.exports
module.exports = function(passport) {

    passport.serializeUser(function(user, done) {
        done(null, user);
    });

    passport.deserializeUser(function(user, done) {
        done(null, user);
    });

    passport.use('local', new LocalStrategy({
        usernameField : 'log',
        passwordField : 'mdp',
        passReqToCallback : true
    },
    function(req, log, mdp, done) {
        models.postulant.find({
            where: {'log' :  log, 'mdp': mdp},
        }).then(function(res) {
            req.session.user = res;

            if(res != null){
                return done(null, {'user': res});
            }

            return done(null, false, {message: 'Incorrect username.'});
        })
    }));
}
