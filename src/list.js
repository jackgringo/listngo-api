'use strict';

var List = {};

List.db = require('./model')('List', {
	title: { type: String, required: true },
	hashId: { type: String },
	userId: { type: String }
});

List.findById = function(id) {
	return List.db.findById(id).execQ();
}

List.create = function(data) {
	return List.db.createQ(data);
}

module.exports = List;
