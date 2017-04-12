var mongoose = require('mongoose');


var artistSchema = mongoose.Schema({
    name : String
}, { versionKey: false });

module.exports = mongoose.model('Artist', artistSchema);