var config = require('./config');
var Hashids = require('hashids');
var salt = config.salt;
var hashids = new Hashids(salt);
var Q = require('q');

function getHashId(model) {
	var deferred = Q.defer();
	setTimeout(function(){
		deferred.resolve({
			model: model,
			hashId: hashids.encryptHex(model._id)
		});
	}, 0);
	return deferred.promise;
}

function encryptHashId(id, model, key) {
	var deferred = Q.defer();
	setTimeout(function(){
		theId = hashids.encryptHex(id);
		if(typeof(model) != "undefined") {
			model[key] = theId;
			model.set(key, theId);
			deferred.resolve(model);
		}
		else {
			deferred.resolve(theId);
		}
	}, 0);
	return deferred.promise;
}

function decryptHashId(id, model, key) {
	var deferred = Q.defer();
	// setTimeout(function(){
		var theId = hashids.decryptHex(id);
		if(typeof(model) != "undefined") {
			model[key] = theId
			deferred.resolve(model);
		}
		else {
			deferred.resolve(theId);
		}
	// }, 0);
	return deferred.promise;
}

module.exports = {
    getHashId: getHashId,
    decryptHashId: decryptHashId,
    encryptHashId: encryptHashId
}