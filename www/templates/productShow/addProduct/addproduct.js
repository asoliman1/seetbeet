angular.module('app')
    .controller('addproductCtrl', ['$scope' , '$state' ,'appService' ,'$cordovaCamera' ,function ($scope,$state,appService,$cordovaCamera){
               $scope.departments=[];
               $scope.subdepartments=[];
               $scope.areas=[];
               $scope.states=[];

                appService.getdepartment(function(res){
                    $scope.departments=res.data;
                },function(err){

                })

                appService.getcountries(function(res){
                    $scope.states=res.data;
                },function(err){

                })

                appService.getAreas(function(res){
                    $scope.areas=res.data;
                },function(err){
                    
                })



               

               $scope.ready = false;
               $scope.images = [];
    
               
    
                $scope.addlogo = function() {
                    
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

                

                $scope.addpic = function(){
                         var options = {
                        quality: 50,
                        
                        allowEdit: true,
                
                        saveToPhotoAlbum: true,
                        correctOrientation:true
                          };
                    $cordovaCamera.getPicture(options).then(function(data){
                        $scope.pictureUrl= 'data:image/jpeg;base64,' + data
                        console.log(angular.toJson(data));
                    }, function(error){
                        console.log(angular.toJson(data));
                    })
                }

            

                         $scope.product={
                                title : '',
                                price : '',
                                areaid : '',
                                cityid : '',
                                posttype: '',
                                departmentid: '',
                                subdepartment : '',
                                content: '',
                                photo: '',
                                otherphoto: ''
                                 };
                
                $scope.selectsubdepartment = function(){
                    console.log($scope.departments)
                    console.log($scope.product.departmentid)
                    for(var i=0;i<$scope.departments.length;i++){
                        if($scope.product.departmentid==$scope.departments[i].id)
                        {
                            $scope.subdepartments=$scope.departments[i].parent
                        }
                    }
                    console.log($scope.subdepartments)
                
                }

                


                $scope.save = function (){
                    appService.addproduct($scope.product,function(res){
                            console.log(res);
                            $state.go('tabsController.main');
                    },function(err){
                        console.log(err)
                    })
                    
                }

    }])