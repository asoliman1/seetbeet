angular.module('app')
.controller('login1Ctrl', ['$scope', '$state', function($scope, $state) {

    $scope.LOgin = function () {
        
      $state.go("tabsController.main");
    }


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