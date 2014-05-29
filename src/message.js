'use strict';

var Hasher = require('./hasher');

var _ = require('lodash-node/underscore');
var merge = require('merge');
var Q = require('q');

var Message = {};

Message.db = require('./model')('Message', {
    text: 		{ type: String, required: true },
    done:		{ type: Boolean },
    deleted:	{ type: Boolean },
    userId:		{ type: String },
    listId:		{ type: String, required: true },
    hashId:		{ type: String }
});

Message.findByList =  function(model) {
    var deferred = Q.defer();
    Message.db.find({ "listId": model._id }, { _id: false }).select('text hashId userId').execQ().then(function(results){
        deferred.resolve(merge({list: model.toObject()}, {messages: results}));
    });
    return deferred.promise;
}

Message.create = function(data) {
	return Message.db.createQ(data);
}

Message.update = function(data) {
	return Message.db.updateQ(data);
}

Message.findById = function(id) {
    return Message.db.findById(id).execQ();
}

module.exports = Message;