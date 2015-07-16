var oldData;
var fetch = function(){
  $.get('/gps', function (data) {
    if (data!==oldData) {
     initialize(JSON.parse(data));
     oldData = data;
      console.log(data);
    } else {
      console.log('No updates, where could Josh be?');
    }
  });
};

