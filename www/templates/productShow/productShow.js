angular.module('app')
.controller('productShowCtrl', ['$scope', '$state','appService', function($scope, $state,appService) {

    $scope.products = [];
    appService.showLoading("جاري التحميل");
    var storeid = appService.storeId
    appService.getproductsBYstoreid(storeid,function(res){
            $scope.products=res.data.data;
            appService.hideLoading();
    },function(err){

    });
    
    $scope.navigate=function (id) { 
        appService.storeId=id;
        $state.go('product'); 
    };


}])