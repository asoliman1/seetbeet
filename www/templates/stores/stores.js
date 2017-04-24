angular.module('app')
.controller('storesCtrl', ['$scope', '$state', function($scope, $state) {
    $scope.stores = 
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
        $state.go('productShow'); 
    }


}])