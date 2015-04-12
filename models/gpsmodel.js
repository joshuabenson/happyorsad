// var express = require('express'),
// mongoose = require('mongoose');
// mongoose.connect('mongodb://localhost/josh');
var oldData;

var fetch = function(){

  $.get('/gps', function (data) {
    if (data!==oldData) {
    initialize(JSON.parse(data));
    oldData = data;
    console.log(data);
  } else {
    console.log('No updates');
  }
  });
};



/*currently we have something like:
1. get request to / routed in server.js,
2. serves up index.html
3. brilliantly, the first function call in indexjs is 'fetch()'
4. this does a get request to /gps
5. which calls 'serverGet()', which calls up the mqtt server and (non asynchronously) respons with the data
6. And fetch also calls initialize with JSON.parse(data) as an argument to GPS data
7. that the map uses to get lon and lat


heres what should happen:

1. get request to / calls serverGet() and ASYNCHRONOUSLY then serves index.html
2. serving index.html triggers a get to gps that calls initialize with the GPS data


What I really want is to establish a client listener connection with the mqtt server and update the page coordinates upon
hearing an update.


*/