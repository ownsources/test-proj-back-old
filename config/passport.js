var LocalStrategy = require('passport-local').Strategy;

var User          = require('../app/models/user');

module.exports = function (passport) {
    //
    // // passport session setup ===========
    // //  ????
    // passport.serializeUser(function (user, done) {
    //     done(null, user.id);
    // });
    //
    // passport.deserializeUser(function (id, done) {
    //     User.findById(id, function (err, user) {
    //         done(err, user);
    //     });
    // });
    //


    // LOCAL LOGIN

    // passport.use('login', new LocalStrategy(
    //     function (req, name, password, done) {
    //
    //         User.findOne({login:name}, function (err, user) {
    //
    //             if(err) {
    //                 console.log(JSON.stringify(user) + ' asfa');
    //                 return done(err);
    //             }
    //             if(!user) {
    //                 console.log('!user');
    //
    //                 return done(null, false, res.json({err: 'No user found'}));
    //             }
    //             if(!user.validPassword(password)){
    //                 console.log('!valid');
    //                 return done(null, false, res.json({err:'Wrong password'}));
    //             }
    //             console.log('ok');
    //             return done(null, user);
    //         });
    //     })
    // );
};