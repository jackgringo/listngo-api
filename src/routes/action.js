module.exports = function (method, res) {
    method
    .then(function(data) { res.json(data); })
    .fail(function(err) { res.json({error: err.message}); });
}