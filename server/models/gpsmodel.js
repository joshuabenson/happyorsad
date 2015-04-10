// var express = require('express'),
// mongoose = require('mongoose');
// mongoose.connect('mongodb://localhost/josh');

var fetch = function(){
  $.get('/gps', function (data) {
    initialize(JSON.parse(data));
  });
};
