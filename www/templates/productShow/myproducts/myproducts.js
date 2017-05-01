angular.module('app')
.controller('myproductsCtrl', ['$scope', '$state','appService', function($scope, $state,appService) {
   
       $scope.myproducts=[];        
               appService.showLoading("جاري التحميل");
               appService.getproductsOfstore(function(res){
                    $scope.myproducts=res.data.products;
                    appService.hideLoading();
               },function(err){

               })
               
                $scope.navigate= function (){   
                }

}])