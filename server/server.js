var mqtt = require('mqtt');
var express = require('express');
var path = require('path');
var app = express();
app.use(express.static(path.join(__dirname, '../')));
// app.use('/', express.static('__dirname'));
// console.log(__dirname);
// app.use('/bower_components',  express.static(__dirname + '/bower_components'));

// app.configure(function(){
//   // Serve up content from public directory
//   app.use(express.static(__dirname + '../'));
//   app.use(express.static(__dirname + '../bower_components'));
//   app.use(app.router);
//   // app.use(express.logger()); 
// });

var context;
//get our GPS data from MQTT server
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

//send mqtt gps data when requested
app.get('/gps', function(req, res){
  context = this;
  serverGet(function(data){
    console.log('sending data... ', data);
    res.send(data);
  });
});

// app.get('/', function(req, res){
//   res.sendfile('./index.html');
// });

var port = process.env.PORT || 8080;
app.listen(port);
console.log("Listening on port " + port);
