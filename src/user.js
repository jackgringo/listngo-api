'use strict';

var User = {};

User.db = require('./model')('User', {
    oauthID: { type: Number, required: true },
    name: { type: String },
    userId: { type: String }
});

User.create = function(data) {
    return User.db.createQ(data);
}

module.exports = User;