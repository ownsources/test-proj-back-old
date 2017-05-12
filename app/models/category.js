var mongoose = require('mongoose');


var categorySchema = mongoose.Schema({
    name : String
}, { versionKey: false });

module.exports = mongoose.model('Category', categorySchema);