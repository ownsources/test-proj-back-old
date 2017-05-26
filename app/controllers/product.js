var Product = require('../models/product');
var Category = require('../models/category');
var mongoose = require("mongoose");

exports.list = function (req, res) {
    ////
};

exports.create = function (req, res) {
    Category.findById(req.body.category.id, function (err, category) {
        if (err) throw err;
        //

        var newProduct = Product({
            name: req.body.name,
            category: category
        });
        newProduct.save(function (err) {
            if(err) throw err;

            Product.findOne(newProduct)
                .populate('category')
                .exec( function (err, product) {
                    res.json(product);
                });
        });
    });
};

exports.get = function (req, res) {
    var query = require('url').parse(req.url,true).query;

    Category.findById(query.id, function (err, category) {
        if(err) res.send(err);

        // console.log(JSON.stringify(query));
        Product.find({category})
            .populate('category')
            .exec( function (err, product) {
                if(err) res.send(err);

                res.json(product);
            })
    })

};

exports.update = function (req, res) {
    Product.findById(req.params.id)
        .populate('category')
        .exec( function (err, product) {

            if(err) res.send(err);

            console.log(JSON.stringify(req.body));

            Category.findById(req.body.category._id, function (err, category) {
                if (err) throw err;

                product.name = req.body.name;
                product.category = category;

                product.save(function (err) {
                    if (err) {
                        res.send(err);
                    } else {
                        res.json(product);
                    }
                });
            });
        });
};

exports.remove = function (req, res) {
    var id = new mongoose.mongo.ObjectID(req.params.id);

    Product.findOne({ _id: id})
        .populate('category')
        .exec( function (err, product) {
            Product.remove(product, function () {
                res.json(product);
            })
        });
};