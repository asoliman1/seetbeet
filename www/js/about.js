angular.module('app')
.controller('aboutCtrl', ['$scope', '$state', 'appService',function($scope, $state ,appService) {
    
     $scope.about = '';
        appService.getabout(function(res){
            $scope.about=res.data.content;
        },function(err){
            appService.showAlert("خطأ","يرجي التأكد من توصيل الأنترنت");
        })


}])