
var fetch = function(){
  $.get('/gps', function (data) {
    initialize(JSON.parse(data));
  });
};
