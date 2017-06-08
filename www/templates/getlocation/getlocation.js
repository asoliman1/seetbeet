angular.module('app')
  .controller('GeoCtrl', function ($cordovaGeolocation, $scope, $ionicPlatform, appService, $ionicHistory) {
    $scope.myGoBack = function () {
      $ionicHistory.goBack();
    }
    cordova.plugins.diagnostic.requestLocationAuthorization(function (status) {
      switch (status) {
        case cordova.plugins.diagnostic.permissionStatus.NOT_REQUESTED:
          appService.showAlert("Permission not requested");
          break;
        case cordova.plugins.diagnostic.permissionStatus.GRANTED:
          appService.showLoading("انتظر..");
          function showMap(coords) {
            var mapoptions = {
              center: { lat: coords.latitude, lng: coords.longitude },
              zoom: 16,
              mapTypeId: google.maps.MapTypeId.ROADMAP
            };
            var map = new google.maps.Map(document.getElementById('map-canvas'), mapoptions);
            var marker = new google.maps.Marker({
              map: map,
              animation: google.maps.Animation.DROP,
              position: new google.maps.LatLng(coords.latitude, coords.longitude)
            });


          }
          $ionicPlatform.ready(function () {
            var posOptions = { timeout: 10000, enableHighAccuracy: true };
            $cordovaGeolocation.getCurrentPosition(posOptions)
              .then(function (position) {
                $scope.coords = position.coords;
                showMap(position.coords);
              }, function (err) {
                console.log('getcurrentposition error: ' + err);
              });
          });
          break;
        case cordova.plugins.diagnostic.permissionStatus.DENIED:
          appService.showAlert("Permission denied");
          break;
        case cordova.plugins.diagnostic.permissionStatus.DENIED_ALWAYS:
          appService.showAlert("Permission permanently denied");
          break;
      }
    }, function (error) {
      console.error(error);
    });


    $scope.savelocation = function () {
      appService.showLoading("جاري حفظ العنوان")
      appService.location = $scope.coords;
      appService.updatelocation(function (res) {
        appService.hideLoading();
        appService.showAlert("تم تحديث العنوان بنجاح");
        $state.go('tabsController.main');
      }, function (err) {
        appService.hideLoading();
      }, $scope.coords)

    }

  })