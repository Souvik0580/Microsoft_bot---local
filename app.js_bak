var express = require('express');
var ConversationV1 = require('watson-developer-cloud/conversation/v1');
const MessagingResponse = require('twilio');
var resolver = require('./helper/context_resolver.js')
const excel2Json = require("xlsx-to-json");
var ws_config = require('./ws_config.js');
var ws_id = '';

var app = express();
const http = require('http');
var server = http.createServer(app);
var io = require('socket.io')(server);
var usercount = 0;
var contexts = [];

app.use(express.static(__dirname + '/public'));

io.on('connection', function(socket){
	usercount++;
	console.log("User count : " + usercount);
	socket.on('chat message', function(msg){
		console.log('message: ' + msg);
		io.emit('chat message', msg);
	});

socket.on('bot message', function(msg){
	var message = msg;
	var number = '123';
	//var twilioNumber = req.query.To;
	
	//const twiml = new MessagingResponse();
	//twiml.message('How may I help you?');
	
	//console.log(number);
	//console.log(twilioNumber);
	//console.log(message);
	//console.log(twilioNumber);
	
	var context = null;
	var index = 0;
	var contextIndex = 0;
	
	if(contexts.length == 0){
		ws_id = ws_config.gen_ws;
	}
	
	contexts.forEach(function(value) {
		console.log(value.from);
		if(value.from == number) {
			context = value.context;
			contextIndex = index;
			if(value.watson_workspace == ''){
				ws_id = ws_config.gen_ws;
			}
			if(value.intent_name == "environmental_issue" && message == "SERVER"){
				console.log("Switch to server agent");
				ws_id = ws_config.server_ws;
				value.watson_workspace = ws_config.server_ws;
			}
		}
		index = index + 1;
	});
	
	
	
var conversation = new ConversationV1({
	username: '34aa0186-a7ce-4d69-8543-fe65de37ed4d',
	password: '8ufPYBH6f2nc',
	version_date: ConversationV1.VERSION_DATE_2016_09_20
});

conversation.message({
	input: { text: message },
	workspace_id: ws_id,
	context: context
}, function(err, response) {
	if(err) {
		console.log("Error");
	} else {
		console.log(response.output.text[0]);
		if(context == null) {
			contexts.push({'from': number, 
						   'context': response.context,
						   'application': '',
						   'info_type': '',
						   'watson_workspace': '',
						   'intent_name': '',
						   'server_array': []});
		} else {
			contexts[contextIndex].context = response.context;
		}
		console.log(response);
		var intent = '';
		if(response.intents.length > 0){
			intent = response.intents[0].intent;
		}
		console.log(intent);
		
		var entity_name = '';
		var entity_value = '';
		if(response.entities.length > 0){
			entity_name = response.entities[0].entity;
			entity_value = response.entities[0].value;
		}
		console.log(entity_name);
		
		
		var resolverObj = resolver(contexts[contextIndex],intent,entity_name,entity_value,response.output.text[0],excel2Json);
		contexts[contextIndex] = resolverObj.context_obj;
		contexts[contextIndex].intent_name = intent;
		var message_final = resolverObj.message;
		
		if(intent == "done") {
			contexts.splice(contextIndex,1);
		}
		
		//console.log(contexts[0].context);
		
		var client = require('twilio')(
		'ACd463a1bb26608a421d23a2d2566bbfd2',
		'e04dedd793e1314dd9b9598c5ca8e381'
		);
		
		/*client.messages.create({
			from: twilioNumber,
			to: number,
			body: message_final
		}, function(err, message) {
			if(err) {
				console.error(err.message);
			}
		});*/
		io.emit('bot message', message_final);
	}
});
});
//res.writeHead(200, {'Content-Type': 'text/xml'})
//res.sendFile(__dirname + '/index.html');
//res.send('');
});

app.get('/connect', function(req, res){
  res.sendFile(__dirname + '/index.html');
});

/*app.listen(8000, function () {
  console.log('Example app listening on port 3000!');
});*/
/*io.on('connection', function(socket){
	usercount++;
	console.log("User count : " + usercount);
	socket.on('chat message', function(msg){
		console.log('message: ' + msg);
		io.emit('chat message', msg);
	});
	
	socket.on('bot message', function(msg){
		console.log('bot message: ' + msg);
		//io.emit('bot message', msg);
	});
	
  
});*/

server.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});