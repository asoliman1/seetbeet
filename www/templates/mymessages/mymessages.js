angular.module('app')
.controller('mymessagesCtrl', ['$scope', '$state', 'appService' ,function($scope, $state,appService) {
        $scope.mymessages=[];
        $scope.message='';
        appService.mymessages(function(res){
                appService.showLoading("جاري تحميل الرسائل",2000);
                $scope.mymessages=res;
                console.log($scope.mymessages);
        },function(err){
                console.log(err)
        })
        $scope.navigate=function(id){
            appService.storeId=id;
        }
        
        


}])