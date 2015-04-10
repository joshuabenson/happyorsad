var mqtt = require('mqtt');
var express = require('express');
// var static = require('node-static');
// var io = require('socket.io').listen(80);
var app = express();
app.use(express.static(__dirname));
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


app.get('/gps', function(req, res){
  //get data from mqtt server and return in response
  serverGet();
  res.send(data);
});

app.get('/', function(req, res){
  res.sendfile('./index.html');
});
var port = process.env.PORT || 8080;
app.listen(port);


