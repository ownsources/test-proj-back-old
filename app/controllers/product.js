var Product = require('../models/product');
var mongoose = require("mongoose");

exports.list = function (req, res) {
    Product.find()
        .populate('category')
        .exec(function (err, products) {

            if(err) throw err;

            res.json(products);
        })
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
    Product.findById(req.params.id)
        .populate('category')
        .exec( function (err, product) {
            if(err) res.send(err);

            res.json(product);
        })
};

exports.update = function (req, res) {
    Product.findById(req.params.id)
        .populate('category')
        .exec( function (err, product) {

            if(err) res.send(err);

            Category.findById(req.body.category.id, function (err, category) {
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