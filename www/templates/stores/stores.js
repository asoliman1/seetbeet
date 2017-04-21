angular.module('app')
.controller('storesCtrl', ['$scope', '$state', function($scope, $state) {
   
    $scope.navigate=function () {
        $state.go('productShow'); 
    }


}])