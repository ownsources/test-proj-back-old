var Category = require('../models/category');
var mongoose = require("mongoose");

exports.list = function (req, res) {
    Category.find(function (err, categorys) {

        if(err) throw err;

        res.json(categorys);
    })
};

exports.create = function (req, res) {
    var newCategory = Category({
        name: req.body.name
    });
    newCategory.save(function (err) {
        if(err) throw err;

        Category.findOne(newCategory, function (err, category) {
            res.json(category);
        });
    });
};

exports.get = function (req, res) {
    Category.findById(req.params.id, function (err, category) {
        if(err) res.send(err);

        res.json(category);
    })
};

exports.update = function (req, res) {
    Category.findById(req.params.id, function (err, category) {

        if(err) res.send(err);

        else{
            category.name = req.body.name;

                category.save(function (err) {
                    if(err){
                        res.send(err);
                    }else{
                        res.json(category);
                    }
                });
            }
    });
};

exports.remove = function (req, res) {
    var id = new mongoose.mongo.ObjectID(req.params.id);

    Category.findOne({ _id: id }, function (err, category) {
        Category.remove(category, function () {
            res.json(category);
        })
    });
};