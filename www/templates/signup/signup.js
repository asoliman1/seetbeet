angular.module('app')
.controller('signupCtrl', ['$scope', '$state','appService',function($scope, $state,appService ) {
    $scope.customer='';
    
    var type = function (){ 
    if($scope.customer)
    return 'premium';
    else
    return 'user';
      }
    $scope.user = {
      name:'',
      email:'',
      mobile:'',
      password:'',
      password_confirm:'',
      level: 'user'
    }


    $scope.navigateMenu = function (a){
     if(a==1)
     $state.go('tabsController.main');
     else if(a==2)
     $state.go('productShow');
     else if(a==3)
     $state.go('addproduct');
     else if(a==4)
     $state.go('getlocation');
     else if(a==5)
     $state.go('notifications');
     else if(a==6)
     $state.go('about');
     else if(a==7)
     $state.go('fees');
     else if(a==8)
     $state.go('login0');
    
   }
    
     $scope.signup = function () {
        appService.showLoading("جاري التسجيل");
        appService.register($scope.user,function(){
             $state.go("verify");
      },
      function(){
        console.log("failed");
      })
      
    }


        $scope.code='';
    $scope.verify = function () {
      appService.activesms($scope.code,function(){
          appService.showAlert("تمت عمليه التسجيل بنجاح");
          $state.go("tabsController.main");
      },function(){
        console.log("failed");
      });
      
      
    }

}])