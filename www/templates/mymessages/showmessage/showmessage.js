angular.module('app')
.controller('messageCtrl', ['$scope', '$state', 'appService' ,function($scope, $state,appService) {
        $scope.message='';
        appService.getmessage(function(res){
                $scope.message=res;
                console.log($scope.message);
        },function(err){
                console.log(err)
        })
        
        
        


}])