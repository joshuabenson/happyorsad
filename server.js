var mqtt = require('mqtt');
var mqttpacket = require('mqtt-packet');

var express = require('express');
// var static = require('node-static');
// var io = require('socket.io').listen(80);
var app = express();
app.use(express.static(__dirname));
var data;

var serverGet = function(callback) {
  var client = mqtt.connect('mqtt://test.mosquitto.org');

  client.on('connect', function(){
  client.subscribe('owntracks/joshb123/joshiphone');
  });

  client.on('message', function(topic, message){
  console.log(message.toString());

  data = message;
 
  initialize(JSON.parse(data));
  
  // console.log(message);
  // client.end();
  });
};

//CALL JQUERY AND PASS ARGUMENTS DUDE

app.get('/gps', function(req, res){
serverGet();
  // res.send(data);
});

app.get('/', function(req, res){
    
  res.sendfile('./index.html', null, function(){
  serverGet();
      // initialize(JSON.parse(data));    
  });
});
var port = process.env.PORT || 8080;
app.listen(port);


