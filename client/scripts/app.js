angular.module('happy', [])
  .controller('MainCtrl', ['$http', function($http) {
    var self = this;
    self.gpsData = {lat:0, lon:0};
    self.fetchGPS = function() {
      return $http.get('/gps').then( function(response) {
        self.gpsData = JSON.parse(JSON.stringify(response.data));
      }, function(errResponse) {
        console.error('Error while fetching Josh GPS data:', errResponse);
      });
    };
    self.fetchGPS();
  }])
  .directive('gMap', [function(){
    var link = function(scope, element, attrs){
      var map, myCenter, mapProp, marker, infoWindow;
      //watch the model of the element for changes (declared using ng-model in html); this will happen when gpsData updates
      scope.$watchCollection(attrs.ngModel, function(newValue, oldValue){
        myCenter = new google.maps.LatLng(newValue.lat, newValue.lon);
        mapProp = {
          center: myCenter,
          zoom: 12,
          mapTypeId: google.maps.MapTypeId.ROADMAP
        };
        map = new google.maps.Map(element[0], mapProp);
        marker = new google.maps.Marker({
          position: myCenter,
          icon: 'joshcopy.png',
          animation: google.maps.Animation.DROP
        })
        marker.setMap(map);
        infowindow = new google.maps.InfoWindow({
          content: convertTimestamp(newValue.tst)
        });
        google.maps.event.addListener(marker, 'animation_changed', function(){
          setTimeout(function() {
            marker.setIcon('joshcopy.png');
            infowindow.close();
          }, 1500);
        marker.setIcon('joshhappy.png');
        infowindow.open(marker.get('map'), marker);
        });  
        google.maps.event.addListener(marker, 'click', function() {
          if (marker.icon==='joshcopy.png') {
            infowindow.open(marker.get('map'), marker);
            marker.setIcon('joshhappy.png');
          } else {
          infowindow.close();
          marker.setIcon('joshcopy.png');
          }
        });
      });
    };
    return {
      restrict: 'A',
      template: '<div id="gmaps"></div>',
      replace: true,
      link: link
    };
  }]);
