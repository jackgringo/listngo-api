'use strict';

var Q = require('q');
var validator = require('validator');
var mongoose = require('mongoose-q')();
var Schema = mongoose.Schema;

module.exports = function(name, schema) {
	var schema = new Schema(schema);
	if (!schema.options.toObject) schema.options.toObject = {};
	schema.options.toObject.transform = function (doc, ret, options) {
	  // remove the _id of every document before returning the result
	  delete ret._id;
	  delete ret.__v;
	}
	return mongoose.model(name, schema);
}