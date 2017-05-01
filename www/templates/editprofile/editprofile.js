angular.module('app')
.controller('editprofileCtrl', ['$scope', '$state','appService','$cordovaCamera',function($scope, $state , appService,$cordovaCamera) {
   
            $scope.myarea='';
            $scope.mycountry='';
            $scope.mycity='';
            $scope.myprofile={};
            var cityid;
            var countryid;
            var areaid;

            appService.myprofile(function(res){
                $scope.myprofile=res;
                 cityid=$scope.myprofile.city;
                 areaid=$scope.myprofile.area;
                 countryid=$scope.myprofile.country;
            },function(err){
                console.log(err);
            })
           
            appService.getcountries(function(res){
                   $scope.mycountry= appService.searchByid(countryid,res.data).name
                },function(err){

                })

                appService.getAreas(function(res){
                    $scope.myarea=appService.searchByid(areaid,res.data).name
                    $scope.mycity=appService.searchByid(cityid,appService.searchByid(areaid,res.data).city).name
                },function(err){
                    
                })

        $scope.update=function(){
            appService.updateprofile($scope.data,function(res){
                    appService.showAlert("تم التعديل بنجاح");
                    $state.go('tabsController.main');
            },function(err){

                appService.showAlert("لم يتم التعديل بنجاح ");

            })
        }

        $scope.update=function(){
            appService.updateprofile($scope.myprofile,function(res){
                console.log(res);
            },function(err){
                console.log(err);
            })
        }

        
                $scope.setImage = function() {
                    $scope.images=[];
                    console.log("hi")
                    var options = {
                        quality: 50,
                        destinationType: Camera.DestinationType.FILE_URI,
                        sourceType: Camera.PictureSourceType.PHOTOLIBRARY,
                        targetWidth: 200,
                        targetHeight: 200
                    };

                        $cordovaCamera.getPicture(options).then(function(imageUri) {
                            console.log('img', imageUri);
                            $scope.images.push(imageUri);
                                    
                        }, function(err) {
                        // error
                        });

                    };

                

}])