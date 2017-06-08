angular.module('app')
  .controller('signupCtrl', ['$scope', '$state', 'appService', '$ionicHistory', function ($scope, $state, appService, $ionicHistory) {

    $scope.done = false;
    $scope.customer = {};
    $scope.client = {};
    $scope.user = {
      name: '',
      email: '',
      mobile: '',
      password: '',
      password_confirm: '',
      level: ''
    }


    $scope.getrules = function () {
      $scope.done = true;
      appService.showLoading("جاري التحميل")
      appService.getrules(function (res) {
        appService.hideLoading();
        appService.showAlert("الشروط و الأحكام", res.data.content);
      }, function (err) {

      })
    }
    $scope.signup = function () {

      
      if ($scope.customer.type)
        $scope.user.level = $scope.customer.type
      else
        $scope.user.level = $scope.client.type

      appService.showLoading("جاري التسجيل");
      appService.register($scope.user, function (res) {
        appService.type = res.user.level;
        var access_token = res.user.api_token;
        appService.saveAccessToken(access_token);
        appService.hideLoading();
        $state.go("verify");
        $ionicHistory.nextViewOptions({ HistoryRoot: false });


      },
        function (err) {
          appService.showAlert("خطأ", err.message)
        })

    }


    $scope.code = {};
    $scope.verify = function () {
      appService.showLoading("جاري التفعيل")
      appService.activesms($scope.code.number, function (res) {
        $ionicHistory.clearCache();
        $ionicHistory.clearHistory();
        $ionicHistory.nextViewOptions({
          disableBack: true,
          historyRoot: true
        });
        appService.hideLoading();
        appService.showAlert("تمت عمليه التسجيل بنجاح");
        if (appService.type == "premium")
          appService.showAlert("برجاء العلم ان هذا المتجر له فتره تجريبيه حتي تجدد اشتراكك لمعرفه الفتره التجريبيه اذهب لصفحه البروفايل و للأشتراك اذهب الي الأشتراك")
        $state.go("tabsController.main");
      }, function (err) {
        appService.showAlert("خطأ", err.message)
      });


    }

  }])