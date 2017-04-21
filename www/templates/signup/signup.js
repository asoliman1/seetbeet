angular.module('app')
.controller('signupCtrl', ['$scope', '$state', function($scope, $state ) {
   
    

     $scope.signup = function () {
      
            $state.go("verify");
      
      
    }

    $scope.verify = function () {

      $state.go("tabsController.main");
      
    }

}])