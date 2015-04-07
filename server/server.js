
var sys = require('sys');
var net = require('net');
var mqtt = require('mqtt');
var static = require('node-static');

// var io = require('socket.io').listen(80);
var data;
 var defaultCorsHeaders = {
    "access-control-allow-origin": "*",
    "access-control-allow-methods": "GET, POST, PUT, DELETE, OPTIONS", 
    "access-control-allow-headers": "content-type, accept",
    "access-control-max-age": 10 // Seconds.
 };
 var headers = defaultCorsHeaders;
 headers['Content-Type'] = "application/json";
var serverGet = function() {

var client = mqtt.connect('mqtt://test.mosquitto.org');


 client.on('connect', function(){
 client.subscribe('owntracks/joshb123/joshiphone');
});

client.on('message', function(topic, message){
  console.log(message.toString());

  data = message;

  client.end();
});
};
setInterval(function(){ serverGet() }, 5000); 

var file = new static.Server('./index.html');

require('http').createServer(function (request, response) {
    request.addListener('end', function () {
       
        file.serve(request, response);

        response.writeHead(200, headers);
        response.end(data);
    }).resume();

}).listen(8080);



  

