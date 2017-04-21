angular.module('app')
.controller('mainCtrl', ['$scope', '$state', function($scope, $state) {
   
    $scope.navigate=function () {
        $state.go('productShow'); 
    }


}])