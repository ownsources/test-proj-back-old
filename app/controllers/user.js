var User        = require('../models/user');
var jwToken     = require("../services/jsToken");

exports.register = function (req, res) {
    User.create({
        login:req.body.name,
        password:req.body.password
    }, function (err, user) {
        if(err) return req.json(err);

        res.json(user);
    });
};

exports.login = function (req, res) {
    User.findOne({login: req.body.name}, function (err, user) {

        if (err) return res.json(err);
        if (!user) return res.json({err: 'No user found'});
        if (!user.validPassword(req.body.password))
            return res.json({err: 'Wrong password'});

        var token = jwToken.signToken({id: user.id, role: user.role});
        return res.json({user, token});
    })
};

exports.history = function (req, res) {

    jwToken.verifyToken(req.params.token, function (err, decoded) {
        if(err || !decoded) return {err:'Что-то с токеном'};

        User.findById(decoded.id, function (err, user) {
            if(err) res.send(err);

            res.json(user.purchase);
        })
    });
};

exports.purchase = function(req,res){
        User.findOne({card: req.body.map.card}, function (err, user) {
            if (err) return res.json(err);
            if (!user) return res.json({err: 'No user found'});

            user.purchase = {
                date: req.body.map.date,
                products: req.body.map.products
            };

            user.save(function (err) {
                if (err) res.json(err);
                else res.json(user);
            })
        })
};

exports.logout = function (req, res) {
    req.logout();
    res.redirect('/');
};