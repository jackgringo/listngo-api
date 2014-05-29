'use strict';

var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var router = express.Router();
var mongoose = require('mongoose');
var List = require('./src/list');
var Message = require('./src/message');

mongoose.connect('mongodb://localhost/listngo');

var routes = require('./src/routes')(router);

app.use(bodyParser());

app.use(function(req, res, next){
  console.log('%s %s', req.method, req.url);
  next();
});

app.use('/api', router);

var server = app.listen(3000, function() {
	console.log("OK, listening on port %d", server.address().port);
});