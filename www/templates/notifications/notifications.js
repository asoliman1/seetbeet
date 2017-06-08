angular.module('app')
.controller('notificationsCtrl', ['$scope', '$state', 'appService','$timeout','$interval','$ionicHistory' ,function($scope, $state,appService,$timeout,$interval,$ionicHistory) {
        $scope.myGoBack = function() {
       $ionicHistory.goBack();
 }
        $scope.notifications=[];
        var updated=[];
        var seen_counter=0;       
        appService.showLoading("جاري التحميل");
        appService.getnotifications(function(res){
                $scope.notifications=res;
                appService.hideLoading();
        },function(err){
        })


        $interval(function(){ appService.getnotifications(function(res){
                updated=res;
                var flag=0;
            if(updated.length!=$scope.notifications.length) { 
                    $scope.notifications=updated;
                        flag=1;
            }
            if(flag==1){
                    for(var i=0;i<updated.length;i++){
                            if(updated[i].seen==0)
                                seen_counter=seen_counter+1;
                    }
                    appService.notification_seen=seen_counter;
            }
            
                appService.hideLoading();
                console.log($scope.notifications);
        },function(err){
                console.log(err)
        }) }, 3 * 10000);

        $scope.doRefresh = function() {
    $timeout( function() {
     appService.getnotifications(function(res){
                $scope.notifications=res;
                appService.hideLoading();
        },function(err){
                console.log(err)
        })
      $scope.$broadcast('scroll.refreshComplete');
    
    }, 1000);
    }
   

}])