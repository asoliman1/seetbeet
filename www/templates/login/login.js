angular.module('app')
.controller('login1Ctrl', ['$scope', '$state', 'appService' , function($scope, $state,appService) {
    $scope.user = {
      email:'',
      password:''
    }
    $scope.LOgin = function () {
        appService.login($scope.user,function(){
            $state.go("tabsController.main");
        },function(){
          console.log("failed");
        })
      
    };


}])

.controller('login0Ctrl', ['$scope', '$state', function($scope, $state) {

     $scope.enter = function () {
      $state.go("login1");
    }
     $scope.signup = function () {
      $state.go("signup");
    }
     $scope.skip = function () {  
      $state.go("tabsController.main");
    }

}])