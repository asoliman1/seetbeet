angular.module('app')
.controller('productShowCtrl', ['$scope', '$state', function($scope, $state) {
    $scope.products = 
        [
            {
                title: "حمد السيد",
                discription: "نشششششششششششش",
                thumbnail:""
            },
            {
                title: "حمد السيد",
                discription: "نشششششششششششش",
                thumbnail:""
            }
        ];
    $scope.navigate=function () {
        $state.go('product'); 
    }


}])