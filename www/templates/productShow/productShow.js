angular.module('app')
.controller('productShowCtrl', ['$scope', '$state', function($scope, $state) {
   
    $scope.navigate=function () {
        $state.go('product'); 
    }


}])