var mongoose = require('mongoose');

var userSchema = mongoose.Schema({
    login    : String,
    password : String,
    card: String,
    role: String,
    purchase: [{
        date: String,
        products: String
    }]
}, { versionKey: false });


// methods

//checking if pass is valid
userSchema.methods.validPassword = function (password) {
    return password === this.password;
};

module.exports = mongoose.model('User', userSchema);