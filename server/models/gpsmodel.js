// var express = require('express'),
// mongoose = require('mongoose');

// mongoose.connect('mongodb://localhost/josh');
var GPSdata;


var fetch = function(){
    $.ajax({ 
    url: 'http://localhost:8080',
    type: 'GET',
    success: function (data) {
      GPSdata = data;
      console.log(GPSdata);
    },
    error: function (data) {
    console.error('nope');
    }
    });
  };
  setInterval(function(){fetch()}, 500);

  // $('body').append(GPSdata.lon);
  // $('body').append(GPSdata.lat);
  console.log(GPSdata);
  