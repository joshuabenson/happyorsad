var mqtt = require('mqtt');
var express = require('express');
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
    // client.end();
  });
};

app.get('/gps', function(req, res){
  //get data from mqtt server and return in response
  serverGet();

  if (data) {
    res.send(data);
  } else {
    setTimeout(function(){ res.send(data) }, 300);
  }  
});

app.get('/', function(req, res){
  res.sendfile('./index.html');
});

var port = process.env.PORT || 8080;
app.listen(port);


