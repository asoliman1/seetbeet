angular.module('app')
.controller('editprofileCtrl', ['$scope', '$state','$http',function($scope, $state , $http) {
    $scope.ahmed='false';
    function edit() {
        $scope.ahmed='true';
        console.log(ahmed);
    }


}])