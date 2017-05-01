angular.module('app')
.controller('productCtrl', ['$scope', '$state','appService', function($scope, $state,appService) {

        $scope.products='';
        var productid=appService.storeId;
        appService.showLoading("جاري التحميل");
        appService.getproductByid(productid,function(res){
                $scope.products=res.data.data[0];
                appService.hideLoading();
                console.log($scope.products)
        },function(err){
                
        })

      $scope.navigate = function (){     
                
                appService.showLoading("جاري الطلب",3000);

        }

}])