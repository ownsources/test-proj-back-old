'use strict';

var jwt    = require('jsonwebtoken');
var tokenSecret = 'emr1QvB1DZfUoNbHLsQF1vSlNRpY1er9';

module.exports= {

    signToken(payload) {
        return jwt.sign(payload, tokenSecret, {expiresIn: '1 day'});
    },

        verifyToken(token, callback) {
        return jwt.verify(token, tokenSecret, callback);
    },
};
