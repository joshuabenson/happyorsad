// function initialize(GPSdata) {
//   var lat = GPSdata.lat;
//   var lon = GPSdata.lon;

//   var myCenter = new google.maps.LatLng(lat,lon);
//   var mapProp = {
//     center:myCenter,
//     zoom:12,
//     mapTypeId:google.maps.MapTypeId.ROADMAP
//   };
//   var map=new google.maps.Map(document.getElementById("googleMap"), mapProp);
//   var marker=new google.maps.Marker({
//     position:myCenter,
//     icon:'joshcopy.png',
//     animation: google.maps.Animation.DROP
//   });
//   marker.setMap(map);
//   var infowindow = new google.maps.InfoWindow({
//     content: convertTimestamp(GPSdata.tst)
//   });
//   google.maps.event.addListener(marker, 'animation_changed', function(){
//     setTimeout(function(){
//       marker.setIcon('joshcopy.png');
//       infowindow.close();
//     }, 1500);
//     marker.setIcon('joshhappy.png');
//     infowindow.open(marker.get('map'), marker);
//   });  
//   google.maps.event.addListener(marker, 'click', function(){
//     if (marker.icon==='joshcopy.png') {
//       infowindow.open(marker.get('map'), marker);
//       marker.setIcon('joshhappy.png');
//     } else {
//       infowindow.close();
//       marker.setIcon('joshcopy.png');
//     }
//   });
// };
// fetch();

angular.module('happy', [])
  .controller('MainCtrl', ['$http', function($http) {
    var self = this;
    self.gpsData = [];
    self.fetchGPS = function() {
      return $http.get('/gps').then( function(response) {
        self.gpsData = response.data; 
      }, function(errResponse) {
          console.error('Error while fetching Josh data');
      });
    };
    self.fetchGPS();
}]);

// setInterval(function() { fetch(); }, 8000);
// google.maps.event.addDomListener(window, 'load', initialize);
