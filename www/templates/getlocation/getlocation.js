angular.module('app')
.controller('GeoCtrl', function($cordovaGeolocation,$scope,$ionicPlatform) {
  function showMap() {
        map = new google.maps.Map(document.getElementById('map'), {
          center: {lat: 56, lng: 22},
          zoom: 8
          
        });
        
      }
$ionicPlatform.ready(function() {
  var posOptions = {timeout: 10000, enableHighAccuracy: true};
  $cordovaGeolocation.getCurrentPosition(posOptions)
    .then(function (posOptions) {
      $scope.coords = position.coords;
        }, function(err) {
          showMap();
      console.log('getcurrentposition error: ' + err );
    });
});
  
})