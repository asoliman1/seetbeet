angular.module('app')
  .controller('menuCtrl', ['$scope', '$state', 'appService', '$ionicHistory', '$cordovaInAppBrowser', '$rootScope', '$ionicSideMenuDelegate', function ($scope, $state, appService, $ionicHistory, $cordovaInAppBrowser, $rootScope, $ionicSideMenuDelegate) {
    $scope.myprofile = '';
    var api_token = '';
    $scope.unseen = 0;
    $scope.msg_seen = 0;
    $scope.invoice_seen = 0;
    $scope.navigateMenu = function (a) {
      if (a == 1)
        $state.go('tabsController.main');
      else if (a == 2)
        $state.go('myproducts');
      else if (a == 3) {
        if (appService.paymoney) {
          appService.showAlert("برجاء تجديد الاشتراك ")
          $cordovaInAppBrowser.open('http://s-baet.com/cp/api/renewal?api_token=' + api_token, '_system', options)
            .then(function (event) {
              console.log("succes");
            })
            .catch(function (event) {
              // error
            });


          $cordovaInAppBrowser.close();
        }
        else
          $state.go('addproduct');
      }
      else if (a == 4)
        $state.go('getlocation');
      else if (a == 5) {
        $state.go('notifications'); $scope.unseen = $scope.unseen - $scope.notification_seen; $scope.notification_seen = 0
      }
      else if (a == 6)
        $state.go('about');
      else if (a == 7) {
        var options = {
          location: 'yes',
          clearcache: 'yes',
          toolbar: 'yes'
        };
        $cordovaInAppBrowser.open('http://s-baet.com/cp/api/renewal?api_token=' + api_token, '_system', options)
          .then(function (event) {
            console.log("succes");
          })
          .catch(function (event) {
            // error
          });


        $cordovaInAppBrowser.close();


      }
      else if (a == 8) {
        $ionicHistory.clearCache();
        $ionicHistory.clearHistory();
        $ionicHistory.nextViewOptions({
          disableBack: true,
          historyRoot: true
        });
        appService.signOut();
        appService.notuser = true;
        $state.go('login0');

      }
      else if (a == 9) {
        $state.go('profile');
      }
      else if (a == 10) {
        if (appService.paymoney) {
          appService.showAlert("برجاء تجديد الاشتراك ")
          $cordovaInAppBrowser.open('http://s-baet.com/cp/api/renewal?api_token=' + api_token, '_system', options)
            .then(function (event) {
              console.log("succes");
            })
            .catch(function (event) {
              // error
            });


          $cordovaInAppBrowser.close();
        }
        else
          $state.go('editprofile');
      }
      else if (a == 11) {
        $state.go('mymessages'); $scope.unseen = $scope.unseen - $scope.msg_seen;
      }
      else if (a == 12)
        $state.go('signup')
      else if (a == 13) {
        if (appService.paymoney) {
          appService.showAlert("برجاء تجديد الاشتراك ")
          $cordovaInAppBrowser.open('http://s-baet.com/cp/api/renewal?api_token=' + api_token, '_system', options)
            .then(function (event) {
              console.log("succes");
            })
            .catch(function (event) {
              // error
            });


          $cordovaInAppBrowser.close();
        }
        else
          $state.go('invoices');
        $scope.unseen = $scope.unseen - $scope.invoice_seen; $scope.invoice_seen = 0;

      }
      else if (a == 14)
        $state.go('login1')
      else if (a == 15)
        $state.go('subscribtions');

      $ionicSideMenuDelegate.toggleRight();
    }


    $rootScope.$on('handleMenu', function (event, data) {
      $ionicSideMenuDelegate.canDragContent(true);
      $scope.premium = false;
      $scope.user = false;
      if (!appService.notuser) {
        $scope.myprofile = appService.profile;
        api_token = $scope.myprofile.api_token;

        if ($scope.myprofile.level == "premium")
          $scope.premium = true;
        else
          $scope.user = true;

        if ($scope.premium) {
          appService.getexpire(function (res) {
            start = res.data.expire_from;
            end = res.data.expire_to;
            startday = start.slice(0, 2) * 1
            endday = end.slice(0, 2) * 1;
            startmonth = start.slice(3, 5) * 1;
            endmonth = end.slice(3, 5) * 1;
            startyear = start.slice(6, 10) * 1;
            endyear = end.slice(6, 10) * 1;
            if (endday - startday == 0 && endmonth - startmonth == 0 && endyear - startyear == 0) {
              appService.showAlert("لقد انتهي اشتراكك برجاء تجديد الأشتراك")
              appService.paymoney == true;
            }
            else if (endday - startday < 0 || endmonth - startmonth < 0 || endyear - startyear < 0) {
              appService.showAlert("لقد انتهي اشتراكك برجاء تجديد الأشتراك")
              appService.paymoney == true;
            }
            else
              appService.paymoney == false;
          }, function (err) {
            console.log(err);
          })

          appService.getalerts(function (res) {
            $scope.invoice_seen = res.data;
          }, function (err) { }, "invoice")
        }

        appService.getalerts(function (res) {
          $scope.msg_seen = res.data;
          console.log($scope.msg_seen)
        }, function (err) { }, "message")

        $scope.unseen = $scope.invoice_seen + $scope.msg_seen;
        appService.hideLoading();
      }
    })




  }])