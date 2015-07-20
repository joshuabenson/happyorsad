function initialize(GPSdata) {
  var lat = GPSdata.lat;
  var lon = GPSdata.lon;

  var myCenter = new google.maps.LatLng(lat,lon);
  var mapProp = {
    center:myCenter,
    zoom:12,
    mapTypeId:google.maps.MapTypeId.ROADMAP
  };
  var map=new google.maps.Map(document.getElementById("googleMap"), mapProp);
  var marker=new google.maps.Marker({
    position:myCenter,
    icon:'joshcopy.png',
    animation: google.maps.Animation.DROP
  });
  marker.setMap(map);
  var infowindow = new google.maps.InfoWindow({
    content: convertTimestamp(GPSdata.tst)
  });
  //this gets run when marker is clicked
  google.maps.event.addListener(marker, 'animation_changed', function(){
    setTimeout(function(){
      marker.setIcon('joshcopy.png');
      infowindow.close();
    }, 1500);
    marker.setIcon('joshhappy.png');
    infowindow.open(marker.get('map'), marker);
  });  
  google.maps.event.addListener(marker, 'click', function(){
    if (marker.icon==='joshcopy.png') {
      infowindow.open(marker.get('map'), marker);
      marker.setIcon('joshhappy.png');
    } else {
      infowindow.close();
      marker.setIcon('joshcopy.png');
    }
  });
};
fetch();
setInterval(function() { fetch(); }, 8000);
google.maps.event.addDomListener(window, 'load', initialize);
