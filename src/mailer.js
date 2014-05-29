'use strict';

var config = require('./config');
var mandrill = require('node-mandrill')(config.mandrillApiKey);
var Q = require('q');
var merge = require('merge');

var Mailer = {

	send: function(methods, data)
	{
		var funcs = [];
		methods.forEach(function(func) { funcs.push(this[func](data)); }, Mailer);
		return Q.all(funcs);
	},

	newListContribs: function(data)
	{
        var deferred = Q.defer();
		mandrill('/messages/send', {
		    message: {
		        to: [{email: config.adminEmail, name: config.adminName}],
		        from_email: 'notifications@listngo.com',
		        subject: "Hey, a new list was created!",
		        text: "A new list called " + data.title + " was created. Check it out at http://localhost:3000/api/lists/" + data.hashId
		    }
		}, function(error, response)
		{
		    if (error) deferred.reject( error );
		    else deferred.resolve(merge(data, {notifications: response}));
		});

        return deferred.promise;
	},

	adminList: function(data)
	{
        var deferred = Q.defer();

		mandrill('/messages/send', {
		    message: {
		        to: [{email: config.adminEmail, name: config.adminName}],
		        from_email: 'notifications@listngo.com',
		        subject: "Someone created a new list",
		        text: "A new list called " + data.model.title + " was created. Check it out at http://localhost:3000/lists/" + data.hashId
		    }
		}, function(error, response)
		{
		    if (error) deferred.reject( error );
		    else deferred.resolve(merge(data, {notifications: response}));
		});

        return deferred.promise;
	}

}

module.exports = Mailer;