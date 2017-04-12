var LocalStrategy = require('passport-local').Strategy;

var User          = require('../app/models/user');

module.exports = function (passport) {

    // passport session setup ===========
    //  ????
    passport.serializeUser(function (user, done) {
        done(null, user.id);
    });

    passport.deserializeUser(function (id, done) {
        User.findById(id, function (err, user) {
            done(err, user);
        });
    });



    // LOCAL LOGIN

    passport.use('local-login', new LocalStrategy({
        usernameField : 'login',
        passportField : 'password',
        passReqToCallback : true
    },
    function (req, login, password, done) {
        User.findOne({'local.login':login}, function (err, user) {
            if(err)
                return done(err);

            if(!user)
                return done(null, false, req.flash('loginMessage', 'No user found'));

            if(!user.validPassword(password))
                return done(null, false, req.flash('loginMessage', 'Wrong password'));

            return done(null, user);
        });
    }));
};