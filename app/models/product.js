var mongoose = require('mongoose');


var productSchema = mongoose.Schema({
    name : String,
    category: { type: mongoose.Schema.Types.ObjectId, ref: 'Category'}
}, { versionKey: false });

module.exports = mongoose.model('Product', productSchema);