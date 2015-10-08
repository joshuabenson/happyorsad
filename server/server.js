var mqtt = require('mqtt');
var express = require('express');
var app = express();
app.use(express.static(__dirname));
var context;

var serverGet = function(callback) {
  var client = mqtt.connect('mqtt://test.mosquitto.org');

  client.on('connect', function(){
    client.subscribe('owntracks/joshb123/joshiphone');
  });
  client.on('message', function(topic, message){
    console.log(message.toString());
    callback.call(context, message);
  });
  client.on('error', function(err){
    console.log(err);
  });
};

app.get('/gps', function(req, res){
  //get data from mqtt server and return in response
  context = this;
  serverGet(function(data){
    res.send(data);
  });
});

// app.get('/', function(req, res){
//   res.sendfile('./index.html');
// });

var port = process.env.PORT || 8080;
app.listen(port);
