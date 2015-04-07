
var sys = require('sys');
var net = require('net');
var mqtt = require('mqtt');
var static = require('node-static');

// var io = require('socket.io').listen(80);
var data;
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
        response.end(data);
    }).resume();

}).listen(8080);





  

