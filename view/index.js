
fetch();
function initialize(GPSdata) {
  var lat = GPSdata.lat;//data from ajax request
  var lon = GPSdata.lon;

  var myCenter = new google.maps.LatLng(lat,lon);
  var mapProp = {
    center:myCenter,
    zoom:14,
    mapTypeId:google.maps.MapTypeId.ROADMAP
  };
  var map=new google.maps.Map(document.getElementById("googleMap"), mapProp);
  var marker=new google.maps.Marker({
    position:myCenter,
    icon:'joshcopy.png'
  });
  // var marker=new google.maps.Marker({
  //   position:myCenter,
  //   });
  marker.setMap(map);
}
google.maps.event.addDomListener(window, 'load', initialize);
