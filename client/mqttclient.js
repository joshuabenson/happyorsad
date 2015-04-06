var socket = io.connect('http://localhost:5000');
    socket.on('connect', function () {
      socket.on('mqttData', function (msg) {
        var elmarr=msg.topic.split("/");

        console.log(msg.topic+' '+msg.payload);
        
     });
     socket.emit('subscribe',{topic:'owntracks/joshb123/joshiphone'});
    });