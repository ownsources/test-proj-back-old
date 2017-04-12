var Performance = require('../models/performance');
var Artist = require('../models/artist');
var Place = require('../models/place');
var mongoose = require("mongoose");

exports.list = function (req, res) {
    Performance.find()
        .populate('artist')
        .populate('place')
        .exec(function (err, performance) {

            if(err) throw err;
            res.json(performance);
        })
};

exports.create = function (req, res) {

    console.log(res.body);

    Artist.findById(req.body.artist.id, function (err, artist) {
        if (err) throw err;
        //
        console.log(artist);
        //
        Place.findById(req.body.place.id, function (err, place) {
            if (err) throw err;
            //
            console.log(place);
            //
            var newPerformance = Performance({
                artist: artist,
                place: place,
                date: req.body.date
            });

            newPerformance.save(function (err) {
                if(err) throw err;

                Performance.findOne(newPerformance)
                            .populate('artist')
                            .populate('place')
                            .exec(function (err, performance) {
                                if(err) res.json(err);

                                res.json(performance);
                            });
            });
        });
    });
};

exports.get = function (req, res) {

    Performance.findOne({_id: req.params.id})
                .populate('artist')
                .populate('place')
                .exec(function (err, performance) {

                    if(err) res.send(err);

                    res.json(performance);
                })
};

exports.update = function (req, res) {

    Performance.findOne({_id: req.params.id})
                .populate('artist')
                .populate('place')
                .exec(function (err, performance) {
        
                    if(err) res.send(err);

                    Artist.findById(req.body.artist.id, function (err, artist) {
                        if (err) throw err;
                        //
                        console.log(artist);
                        //
                        Place.findById(req.body.place.id, function (err, place) {
                            if (err) throw err;
                            //
                            console.log(place);
                            //
                            performance.artist = artist;
                            performance.place  = place;
                            performance.date   = req.body.date;

                            performance.save(function (err) {
                                if(err) throw err;
                                console.log('upd');
                                res.json(performance);
                            });
                        });
                    });
        
                });
};

exports.remove = function (req, res) {
    var id = new mongoose.mongo.ObjectID(req.params.id);
    console.log(id);
    Performance.findOne({ _id: id })
                .populate('artist')
                .populate('place')
                .exec(function (err, performance) {
                    if(err) console.log(err);

                    console.log(performance);

                    Performance.remove(performance, function () {
                        if(err) throw err;

                        res.json(performance);
                    })
                });
};