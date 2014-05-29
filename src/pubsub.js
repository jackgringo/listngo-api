var Mailer = require('./mailer');
var merge = require('merge');
var redis = require('then-redis');
var Q = require('q');
var notiClient = redis.createClient();
var appClient = redis.createClient();
var msgCount = 0;

notiClient.on("error", function (err) {
    console.log("Error " + err);
});

notiClient.on("subscribe", function(channel, count) {
	// appClient.publish("lists", "Test message");
});

notiClient.on("message", function(channel, data) {
    Mailer.newListContribs(JSON.parse(data));
	msgCount += 1;
});

notiClient.incr("set up");
notiClient.subscribe("lists");

var publish = function(channel, method, data) {
    console.log(channel, method, data);
    var list = {
        title: data.title,
        hashId: data.hashId
    };
	return appClient.publish(channel, JSON.stringify(list))
    .then(function() { return list; });
}

module.exports = {
	publish: publish
}