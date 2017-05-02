angular.module('app')
.controller('mymessagesCtrl', ['$scope', '$state', 'appService' ,function($scope, $state,appService) {
        $scope.mymessages=[];
        appService.showLoading("جاري تحميل الرسائل");
        appService.mymessages(function(res){
                $scope.mymessages=res.data.data;
                appService.hideLoading();
                console.log($scope.mymessages);
        },function(err){
                console.log(err)
        })
        $scope.navigate=function(id){
            appService.storeId=id;
            $state.go('message')
        }
        
        


}])