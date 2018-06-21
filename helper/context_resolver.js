//var excel2Json = require('excel2json');

var resolver = function(context_obj,intent,entity_name,entity_value,message,excel2Json) {
	console.log(context_obj.from + " : " + intent + " : " + entity_name + " : " + message + " : " + context_obj.application);
	
	if(entity_name == "application"){
		context_obj.application = entity_value;
		
		var server_array = []
		excel2Json({
			input: "resource/ApplicationServers.xlsx",
			output: null,
			sheet: "Sheet1"
		  }, function(err, result) {
			if(err) {
			  console.error(err);
			} else {
			  console.log("application : " + entity_value);
			  console.log(result);
			  
			  for (var i in result) {
				  if(result[i].application == entity_value){
					  server_array.push(result[i].app_server);
				  }
			  }
				 
			  console.log(server_array.toString());
			  context_obj.server_array = server_array.toString();
			  
			}
		  });
		
		return {'context_obj': context_obj, 'message': message};
	}
	
	if(intent == "server_start"){
		console.log("Server agent started.....");
		
		message = message + context_obj.server_array.toString();
		  
		return {'context_obj': context_obj, 'message': message};
		
	}
	
	return {'context_obj': context_obj, 'message': message};
}



module.exports = resolver