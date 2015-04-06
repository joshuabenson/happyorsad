var sys = require('sys');
var net = require('net');
var mqtt = require('mqtt');

var io = require('socket.io').listen(1880);
var client = mqtt.connect('mqtt:test.mosquitto.org', { 
  keepalive: 10
, clean: true
, clientId: 'happy'
, reconnectPeriod: 5000
})


client.on('connect', function(){
  client.subscribe('owntracks/joshb123/joshiphone');
});

client.on('message', function(topic, message){
  console.log(message.toString());
  client.end();
})
