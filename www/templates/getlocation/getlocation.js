angular.module('app')
.controller('GeoCtrl', function($cordovaGeolocation,$scope,$ionicPlatform,appService) {
  appService.showLoading("انتظر..",3000);
  function showMap(coords) {
    var mapoptions = {
      center: {lat: coords.latitude, lng: coords.longitude},
          zoom: 16,
           
        };
      var  map = new google.maps.Map(document.getElementById('map-canvas'),   mapoptions );
     
      }
$ionicPlatform.ready(function() {
  var posOptions = {timeout: 10000, enableHighAccuracy: true};
  $cordovaGeolocation.getCurrentPosition(posOptions)
    .then(function (position) {
      $scope.coords = position.coords;
      showMap(position.coords);
        }, function(err) {
      console.log('getcurrentposition error: ' + err );
    });
});
  
})