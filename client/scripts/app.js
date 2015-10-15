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
  .controller('MainCtrl', ['$scope', '$http', function($scope, $http) {
    var self = this;
    self.gpsData = {lat:0, lon:0};
    self.fetchGPS = function() {
      return $http.get('/gps').then( function(response) {
        self.gpsData = JSON.parse(JSON.stringify(response.data));
        console.log(self, self.gpsData);
      }, function(errResponse) {
        console.error('Error while fetching Josh GPS data:', errResponse);
      });
    };
    self.fetchGPS();
  }])
  .directive('gMap', [function(){
    var link = function(scope, element, attrs){
      var map, myCenter, mapProp, marker;
      //watch the model of the element for changes (declared using ng-model in html); this will happen when gpsData updates
      scope.$watchCollection(attrs.ngModel, function(newValue, oldValue){
        console.log(element, attrs);
        myCenter = new google.maps.LatLng(newValue.lat, newValue.lon);
        mapProp = {
          center: myCenter,
          zoom: 12,
          mapTypeId: google.maps.MapTypeId.ROADMAP
        };
        map = new google.maps.Map(element[0], mapProp);
        marker = new google.maps.Marker({
          position:myCenter,
          icon:'joshcopy.png',
          animation: google.maps.Animation.DROP
        })
        marker.setMap(map);
      });
    };
    return {
      restrict: 'A',
      template: '<div id="gmaps"></div>',
      replace: true,
      link: link
    };
  }])

// setInterval(function() { fetch(); }, 8000);
// google.maps.event.addDomListener(window, 'load', initialize);
