angular.module('app')
.controller('storesCtrl', ['$scope', '$state','appService', function($scope, $state,appService) {
    $scope.stores=[];
    appService.showLoading("جاري التحميل");
        appService.allstore(function(res){
            $scope.stores=res.data.data;
            appService.hideLoading();
        },function(err){
            appService.showAlert("خطأ");
        })
        
        $scope.navigate = function (id) {
                appService.storeId=id;
                console.log(appService.storeId);
                $state.go('productShow'); 
        }
    


}])