angular.module('app')
.controller('mainCtrl', ['$scope', '$state', 'appService',function($scope, $state,appService) {

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
       /* appService.topstore(function(data){
            console.log(data);
        },function(){
            console.log("error");
        }) */
        $state.go('productShow'); 
    }


}])