angular.module('app')
  .controller('profileCtrl', ['$scope', '$state', 'appService', '$interval', '$ionicModal', '$ionicHistory', function ($scope, $state, appService, $interval, $ionicModal, $ionicHistory) {

    $scope.myGoBack = function () {
      $ionicHistory.goBack();
    }

    $scope.myprofile = {};
    appService.showLoading("جاري التحميل");
    $scope.myprofile = appService.profile;
    appService.type = $scope.myprofile.level;
    $scope.gettype = function () {
      if ($scope.myprofile.level == "premium")
        return true
      else
        return false
    }
    if ($scope.myprofile.lat != null && $scope.myprofile.lng != null) {
      $scope.location = true;
      var mapoptions = {
        center: { lat: $scope.myprofile.lat * 1, lng: $scope.myprofile.lng * 1 },
        dragabble: false,
        scrollwheel: false,
        zoom: 16,
        mapTypeId: google.maps.MapTypeId.ROADMAP
      };
      var map = new google.maps.Map(document.getElementById('map-canvas1'), mapoptions);
      var marker = new google.maps.Marker({
        map: map,
        animation: google.maps.Animation.DROP,
        position: new google.maps.LatLng($scope.myprofile.lat * 1, $scope.myprofile.lng * 1)
      });

    }
    else {
      $scope.location = false;
    }





    appService.getexpire(function (res) {
      $scope.expire = res.data
      appService.hideLoading();
    }, function (err) {
      console.log(err);
    })

    $ionicModal.fromTemplateUrl('image-modal.html', {
      scope: $scope,
      animation: 'slide-in-up'
    }).then(function (modal) {
      $scope.modal = modal;
    });

    $scope.openModal = function () {
      $scope.modal.show();
    };

    $scope.closeModal = function () {
      $scope.modal.hide();
    };

    //Cleanup the modal when we're done with it!
    $scope.$on('$destroy', function () {
      $scope.modal.remove();
    });
    // Execute action on hide modal
    $scope.$on('modal.hide', function () {
      // Execute action
    });
    // Execute action on remove modal
    $scope.$on('modal.removed', function () {
      // Execute action
    });
    $scope.$on('modal.shown', function () {
      console.log('Modal is shown!');
    });


    $scope.showImage = function (index) {
      index = "http://s-baet.com/cp/upload/" + index
      $scope.imageSrc = index;
      $scope.openModal();
    }



  }])

  .controller('accountprofileCtrl', ['$scope', '$state', 'appService', '$ionicModal', '$ionicHistory', function ($scope, $state, appService, $ionicModal, $ionicHistory) {

    $scope.myGoBack = function () {
      $ionicHistory.goBack();
    }
    $scope.myprofile = {};
    var directionsDisplay;
    var directionsService = new google.maps.DirectionsService();
    var lat;
    var lng;
    var mylat = appService.profile.lat * 1
    var mylng = appService.profile.lng * 1;
    console.log(mylat + "," + mylng);
    appService.getprofilebyid(function (res) {
      console.log(res)
      $scope.myprofile = res.data;
      $scope.gettype = function () {
        if (res.data.level == "premium")
          return true;
        else
          return false;
      }
      lat = res.data.lat * 1;
      lng = res.data.lng * 1
      console.log("here")
      if (res.data.lat != null && res.data.lng != null) {
        $scope.location = true;
        directionsDisplay = new google.maps.DirectionsRenderer();
        var mapoptions = {
          center: { lat: res.data.lat * 1, lng: res.data.lng * 1 },
          dragabble: false,
          scrollwheel: false,
          zoom: 16,
          mapTypeId: google.maps.MapTypeId.ROADMAP
        };
        var map = new google.maps.Map(document.getElementById('map-canvas1'), mapoptions);
        directionsDisplay.setMap(map);
        var marker = new google.maps.Marker({
          map: map,
          animation: google.maps.Animation.DROP,
          position: new google.maps.LatLng(res.lat * 1, res.lng * 1)
        });

      }
      else {
        $scope.location = false;
      }

    }, function (err) {
      console.log(err)
    }, appService.profileid)


    $scope.calcRoute = function () {
      var selectedMode = "DRIVING";
      var request = {
        origin: { lat: mylat, lng: mylng },
        destination: { lat: lat, lng: lng },
        // Note that Javascript allows us to access the constant
        // using square brackets and a string value as its
        // "property."
        travelMode: google.maps.TravelMode[selectedMode]
      };
      directionsService.route(request, function (response, status) {
        if (status == 'OK') {
          directionsDisplay.setDirections(response);
        }
      });
    }
    $ionicModal.fromTemplateUrl('image-modal.html', {
      scope: $scope,
      animation: 'slide-in-up'
    }).then(function (modal) {
      $scope.modal = modal;
    });

    $scope.openModal = function () {
      $scope.modal.show();
    };

    $scope.closeModal = function () {
      $scope.modal.hide();
    };

    //Cleanup the modal when we're done with it!
    $scope.$on('$destroy', function () {
      $scope.modal.remove();
    });
    // Execute action on hide modal
    $scope.$on('modal.hide', function () {
      // Execute action
    });
    // Execute action on remove modal
    $scope.$on('modal.removed', function () {
      // Execute action
    });
    $scope.$on('modal.shown', function () {
      console.log('Modal is shown!');
    });


    $scope.showImage = function (index) {
      index = "http://s-baet.com/cp/upload/" + index
      $scope.imageSrc = index;
      $scope.openModal();
    }




  }])
