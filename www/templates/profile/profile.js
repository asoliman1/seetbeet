angular.module('app')
.controller('profileCtrl', ['$scope', '$state','appService', function($scope, $state,appService) {
    
            $scope.myarea='';
            $scope.mycountry='';
            $scope.mycity='';
            $scope.myprofile={};
            var cityid;
            var countryid;
            var areaid;
           appService.showLoading("جاري التحميل");
            appService.myprofile(function(res){
                $scope.myprofile=res;
                 cityid=$scope.myprofile.city;
                 areaid=$scope.myprofile.area;
                 countryid=$scope.myprofile.country;
            },function(err){
                console.log(err);
            })
                
            appService.getcountries(function(res){
                   $scope.mycountry= appService.searchByid(countryid,res.data)
                   $scope.mycountry=$scope.mycountry.name
                },function(err){

                })

                appService.getAreas(function(res){
                    $scope.myarea=appService.searchByid(areaid,res.data).name
                    $scope.mycity=appService.searchByid(cityid,appService.searchByid(areaid,res.data).city).name;
                    appService.hideLoading();
                },function(err){
                    
                })
            

}])