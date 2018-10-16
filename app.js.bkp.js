var express = require('express');
//var ConversationV1 = require('watson-developer-cloud/conversation/v1');
//const MessagingResponse = require('twilio');
var resolver = require('./helper/context_resolver.js')
//const excel2Json = require("xlsx-to-json");
var ws_config = require('./ws_config.js');
var apiai = require('apiai');
var ws_id = '';

var app = express();
const http = require('http');
var server = http.createServer(app);
var io = require('socket.io')(server);
var usercount = 0;
var contexts = [];

app.use(express.static(__dirname + '/public'));
app.get('/connect', function(req, res){
  res.sendFile(__dirname + '/home_page.html');
});

app.get('/index', function(req, res){
  res.sendFile(__dirname + '/index1.html');
});



server.listen(8000, function () {
  console.log('Example app listening on port 8000!');
});