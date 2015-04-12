var mqtt = require('mqtt');
var express = require('express');
// var static = require('node-static');
// var io = require('socket.io').listen(80);
var app = express();
app.use(express.static(__dirname));
var data;
// var fresh;
var serverGet = function(callback) {
  var client = mqtt.connect('mqtt://test.mosquitto.org');

  client.on('connect', function(){
  client.subscribe('owntracks/joshb123/joshiphone');
  });

  client.on('message', function(topic, message){
  console.log('New data:', message.toString());
  data = message;
  // fresh = true;
  callback();
  // client.end();
  });
};

serverGet(function(){});

app.get('/gps', function(req, res){

  res.send(data);  

});

app.get('/', function(req, res){
  // serverGet();
  // res.sendfile('./index.html', null, function(){
  // });
});

var port = process.env.PORT || 8080;
app.listen(port);


