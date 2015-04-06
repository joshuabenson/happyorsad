var sys = require('sys');
var net = require('net');
var mqtt = require('mqtt');
var mqttClient = require('MQTTClient');
var io = require('socket.io').listen(5000);

var client = new mqtt.MQTTClient(1883, 'test.mosquitto.org');

io.sockets.on('connection', function(socket) {
  socket.on('subscribe', function(data) {
    console.log('You are subscribed to' + data.topic);
    console.log(data.lat);
    client.subscribe(data.topic);
  });
});

client.addListener('mqttData', function(topic, payload) {
  sys.puts(topic+'='+payload);
  io.sockets.emit('mqtt', {'topic':String(topic),
    'payload':String(payload)});
})


// client.on('connect', function(){
//   client.subscribe('owntracks/joshb123/joshiphone');
// });

// client.on('message', function(topic, message){
//   console.log(message.toString());
//   client.end();
// })

// client.on('message', function(topic, message) {
//   console.log(message);
//   sys.puts(topic+ '=' +message);
//   io.sockets.in(topic).emit('mqtt',{'topic'})
// })