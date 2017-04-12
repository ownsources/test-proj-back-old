var Place = require('../models/place');
var mongoose = require("mongoose");

exports.list = function (req, res) {
    Place.find(function (err, places) {

        if(err) throw err;

        res.json(places);
    })
};

exports.create = function (req, res) {
    var newPlace = Place({
        name: req.body.name
    });
    newPlace.save(function (err) {
        if(err) throw err;

        Place.findOne(newPlace, function (err, place) {
            res.json(place);
        });
    });
};

exports.get = function (req, res) {
    Place.findById(req.params.id, function (err, place) {
        if(err) res.send(err);

        res.json(place);
    })
};

exports.update = function (req, res) {
    Place.findById(req.params.id, function (err, place) {

        if(err) res.send(err);

        else{
            place.name = req.body.name;

            place.save(function (err) {
                if(err){
                    res.send(err);
                }else{
                    res.json(place);
                }
            });
        }
    });
};

exports.remove = function (req, res) {
    var id = new mongoose.mongo.ObjectID(req.params.id);

    Place.findOne({ _id: id}, function (err, place) {
        Place.remove(place, function () {
            res.json(place);
        })
    });
};