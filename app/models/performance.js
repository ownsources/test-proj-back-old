var mongoose = require('mongoose');


var performanceSchema = mongoose.Schema({
    artist  : { type: mongoose.Schema.Types.ObjectId, ref: 'Artist'},
    place   : { type: mongoose.Schema.Types.ObjectId, ref: 'Place'},
    date    : Date
}, { versionKey: false });

module.exports = mongoose.model('Performance', performanceSchema);