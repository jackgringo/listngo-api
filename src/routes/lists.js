var List = require('../list');
var Message = require('../message');

module.exports = function(respond, Hasher, PubSub){
    return {
        find: function(req, res) {
            Hasher.decryptHashId(req.params.list)
            .then(List.findById)
            .then(Message.findByList)
            .then(respond.bind(res, 'Found list'))
            .fail(function(err) { res.json({error: err.message, stack: err.stack}); });
        },
        create: function(req, res) {
            List.create(req.body)
            .then(function(data) {
                return Hasher.encryptHashId(data._id, data, 'hashId')
            })
            .then(function(data) {
                return List.db.findByIdAndUpdate(data._id, { hashId: data.hashId }).execQ();
            })
            .then(PubSub.publish.bind(res, 'lists', 'created'))
            .then(respond.bind(res, 'List created'))
            .fail(function(err) { res.json({error: err.message}); });
        },
        update: function(req, res) {
            Hasher.decryptHashId(req.params.list)
            .then(function(id){
                return List.db.update({ "_id": id }, req.body).execQ();
            })
            .then(respond.bind(res, 'List updated'))
            .fail(function(err) { res.json({error: err.message}); });
        }
    };
}