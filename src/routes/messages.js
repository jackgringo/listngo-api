var Message = require('../message');

module.exports = function(respond, Hasher, PubSub){
    return {
        find: function(req, res) {
            Hasher.decryptHashId(req.params.message)
            .then(Message.findById)
            .then(respond.bind(res, 'Found message'))
            .fail(function(err) { res.json({error: err.message}); });
        },
        create: function(req, res) {
            Hasher.decryptHashId(req.body.listId, req.body, 'listId')
            .then(Message.create)
            .then(function(data) {
                return Hasher.encryptHashId(data._id, data, 'hashId')
            })
            .then(function(data) {
                return Message.db.findByIdAndUpdate(data._id, { hashId: data.hashId }).execQ();
            })
            .then(PubSub.publish.bind(res, 'message', 'created'))
            .then(respond.bind(res, 'Message created'))
            .fail(function(err) { res.json({error: err.message, stack: err.stack}); });
        },
        update: function(req, res) {
            Hasher.decryptHashId(req.params.message)
            .then(function(id){
                return Message.db.update({ "_id": id }, req.body).execQ();
            })
            .then(respond.bind(res, 'Message updated'))
            .fail(function(err) { res.json({error: err.message}); });
        }
    };
}