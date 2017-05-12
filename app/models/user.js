var mongoose = require('mongoose');

var userSchema = mongoose.Schema({
    login    : String,
    password : String
}, { versionKey: false });


// methods

//checking if pass is valid
userSchema.methods.validPassword = function (password) {
    return password === this.password;
};

module.exports = mongoose.model('User', userSchema);