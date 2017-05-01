angular.module('app')
.controller('notificationsCtrl', ['$scope', '$state', 'appService' ,function($scope, $state,appService) {
        $scope.notifications=[];
        appService.showLoading("جاري التحميل");
        appService.getnotifications(function(res){
                $scope.notifications=res;
                appService.hideLoading();
                console.log($scope.notifications);
        },function(err){
                console.log(err)
        })
   

}])