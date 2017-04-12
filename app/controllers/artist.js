var Artist = require('../models/artist');
var mongoose = require("mongoose");

exports.list = function (req, res) {
    Artist.find(function (err, artists) {

        if(err) throw err;

        res.json(artists);
    })
};

exports.create = function (req, res) {
    var newArtist = Artist({
        name: req.body.name
    });
    newArtist.save(function (err) {
        if(err) throw err;

        Artist.findOne(newArtist, function (err, artist) {
            res.json(artist);
        });
    });
};

exports.get = function (req, res) {
    Artist.findById(req.params.id, function (err, artist) {
        if(err) res.send(err);

        res.json(artist);
    })
};

exports.update = function (req, res) {
    Artist.findById(req.params.id, function (err, artist) {

        if(err) res.send(err);

        else{
            artist.name = req.body.name;

                artist.save(function (err) {
                    if(err){
                        res.send(err);
                    }else{
                        res.json(artist);
                    }
                });
            }
    });
};

exports.remove = function (req, res) {
    var id = new mongoose.mongo.ObjectID(req.params.id);

    Artist.findOne({ _id: id }, function (err, artist) {
        Artist.remove(artist, function () {
            res.json(artist);
        })
    });
};