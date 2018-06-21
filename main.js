var express = require('express');
var apiai = require('apiai');

var app = express();
const http = require('http');
var server = http.createServer(app);
var app = apiai("3d11cf9994504a358229d326f6b1bef3");

server.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});

var request = app.textRequest('Subset of customers facing login issue in cbol', {
    sessionId: '123'
});

request.on('response', function(response) {
    console.log(response);
});

request.on('error', function(error) {
    console.log(error);
});

request.end();