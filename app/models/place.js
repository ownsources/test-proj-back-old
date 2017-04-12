var mongoose = require('mongoose');


var placeSchema = mongoose.Schema({
    name : String
}, { versionKey: false });

module.exports = mongoose.model('Place', placeSchema);