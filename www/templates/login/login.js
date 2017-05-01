angular.module('app')
.controller('login1Ctrl', ['$scope', '$state', 'appService' ,'$ionicHistory',function($scope, $state,appService,$ionicHistory) {
    $scope.user = {
      email:'',
      password:''
    }
    $scope.LOgin = function () {
      appService.showLoading("جاري التحميل");
        appService.login($scope.user,function(res){
            appService.saveAccessToken(res.user.api_token);
            appService.hideLoading();
            $ionicHistory.clearCache();
           $ionicHistory.clearHistory();
            $ionicHistory.nextViewOptions({
            disableBack: true,
            historyRoot: true
        });
            $state.go("tabsController.main");
        },function(err){
          appService.showAlert("خطأ",err.messages);
        })
      
    };



}])

.controller('login0Ctrl', ['$scope', '$state','appService', function($scope, $state,appService) {

     $scope.enter = function () {
      $state.go("login1");
 
    }
     $scope.signup = function () {
      $state.go("signup");
   
    }
     $scope.skip = function () {  
       appService.signOut();
      $state.go("tabsController.main");
    }

}])