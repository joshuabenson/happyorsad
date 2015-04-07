
var sys = require('sys');
var net = require('net');
var mqtt = require('mqtt');
var express = require('express');

// var static = require('node-static');
// var io = require('socket.io').listen(80);
var app = express();
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

app.use(express.static(__dirname));

app.get('/gps', function(req, res){
  //get data from mqtt server and return in response

  serverGet();
  res.send(data);
});

app.get('/', function(req, res){
  res.sendfile('./index.html');
});

app.listen(3000);


