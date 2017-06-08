angular.module('app')
  .controller('login1Ctrl', ['$scope', '$state', 'appService', '$ionicHistory', '$ionicSideMenuDelegate', function ($scope, $state, appService, $ionicHistory, $ionicSideMenuDelegate) {
    $scope.user = {
      email: '',
      password: ''
    }
    $ionicSideMenuDelegate.canDragContent(false)
    $scope.LOgin = function () {
      appService.showLoading("جاري التحميل");
      appService.login($scope.user, function (res) {
        appService.saveAccessToken(res.user.api_token);
        appService.hideLoading();
        $ionicHistory.clearCache();
        $ionicHistory.clearHistory();
        $ionicHistory.nextViewOptions({
          disableBack: true,
          historyRoot: true
        });
        appService.profile = res.user;
        appService.type = res.user.level;
        appService.hideLoading();
        $state.go("tabsController.main");
      }, function (err) {
        appService.hideLoading();
      })

    };



  }])

  .controller('login0Ctrl', ['$scope', '$state', 'appService', '$ionicSideMenuDelegate', function ($scope, $state, appService, $ionicSideMenuDelegate) {

    $ionicSideMenuDelegate.canDragContent(false);
    $scope.enter = function () {
      appService.notuser = false;
      $state.go("login1");

    }
    $scope.signup = function () {
      appService.notuser = false;
      $state.go("signup");

    }
    $scope.skip = function () {
      appService.signOut();
      appService.notuser = true;
      $state.go("tabsController.main");
    }

  }])