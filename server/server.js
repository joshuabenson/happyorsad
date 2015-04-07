var sys = require('sys');
var net = require('net');
var mqtt = require('mqtt');
var mqttClient = require('MQTTClient');
var io = require('socket.io').listen(5000);

var client = mqtt.connect('mqtt://test.mosquitto.org');




client.on('connect', function(){
  client.subscribe('owntracks/joshb123/joshiphone');
});

client.on('message', function(topic, message){
  console.log(message.toString());
  client.end();
});
