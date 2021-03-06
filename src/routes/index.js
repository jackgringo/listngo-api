var mongoose = require('mongoose');
var ObjectId = mongoose.Types.ObjectId;
var PubSub = require('../pubsub');
var Hasher = require('../hasher');
var merge = require('merge');

var respond = function(message, data) {
    if(typeof(data) == 'undefined') {
        data = message;
        message = null;
    }
    this.json(merge({message: message}, {data: data}));
}

var lists = require('./lists')(respond, Hasher, PubSub);
var messages = require('./messages')(respond, Hasher, PubSub);

var setup = function(router) {
    router.post('/lists', lists.create);
    router.put('/lists/:list', lists.update);
    router.get('/lists/:list', lists.find);
    router.post('/messages', messages.create);
    router.get('/messages/:message', messages.find);
    router.put('/messages/:message', messages.update);
}

module.exports = setup;