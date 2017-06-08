angular.module('app')
.controller('offersCtrl', ['$scope', '$state', 'appService','$timeout','$interval' ,function($scope, $state,appService,$timeout,$interval) {
        $scope.offers=[];
        updated=[]
        appService.showLoading("جاري التحميل");
        appService.alloffer(function(res){
                $scope.offers=res.data.data;
                appService.hideLoading();
                console.log($scope.offers);
        },function(err){
                console.log(err)
        })

        $scope.navigate=function (id) { 
        appService.productid=id;
         $state.go('tabsController.product2');
    };
   
   $scope.doRefresh = function() {
    $timeout( function() {
    appService.alloffer(function(res){
                updated=res.data.data;
            if(updated.length!=$scope.offers.length) { 
                    $scope.offers=updated;    
            }
                appService.hideLoading();
                console.log($scope.offers);
        },function(err){
                console.log(err)
        })
      $scope.$broadcast('scroll.refreshComplete');
    
    }, 1000);
    }

}])