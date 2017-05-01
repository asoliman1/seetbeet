angular.module('app')
.controller('mainCtrl', ['$scope', '$state', 'appService',function($scope, $state,appService) {
     $scope.stores = [];
     appService.showLoading("اهلا بكم في ست البيت")
     appService.topstore(function(res){
            $scope.stores=res.data;
            appService.hideLoading();
        },function(err){
            appService.showAlert("خطأ",err);
        });



        $scope.navigate=function(id){
            appService.storeId=id;
            $state.go('productShow');
        }
        


}])