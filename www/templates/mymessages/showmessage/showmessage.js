angular.module('app')
.controller('messageCtrl', ['$scope', '$state', 'appService' ,function($scope, $state,appService) {
       $scope.mymessages=[];
        appService.showLoading("جاري تحميل الرسائل");
        appService.mymessages(function(res){
                $scope.mymessages=res.data.data;
                appService.hideLoading();
                console.log($scope.mymessages);
        },function(err){
                console.log(err)
        })
        


}])