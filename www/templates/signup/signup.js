angular.module('app')
.controller('signupCtrl', ['$scope', '$state','appService','$ionicHistory',function($scope, $state,appService,$ionicHistory ) {
    
    
     type = function (){ 
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
      level: type()
    }
    $scope.getrules=function(){
      appService.showLoading("جاري التحميل")
      appService.getrules(function(res){
        appService.hideLoading();
        appService.showAlert("الشروط و الأحكام",res.data.content);
      },function(err){

      })
    }
     $scope.signup = function () {
        appService.showLoading("جاري التسجيل");
        appService.register($scope.user,function(res){
          appService.type=res.user.level;
          var access_token= res.user.api_token;
           appService.saveAccessToken(access_token);
           appService.hideLoading();
             $state.go("verify");
             $ionicHistory.nextViewOptions({HistoryRoot: false});
            console.log(type());

             
      },
      function(err){
        appService.showAlert("خطأ",err.message)
      })
      
    }


        $scope.code='';
    $scope.verify = function () {
      appService.showLoading("جاري التفعيل")
      appService.activesms($scope.code,function(res){
         $ionicHistory.clearCache();
                  $ionicHistory.clearHistory();
                  $ionicHistory.nextViewOptions({
                      disableBack: true,
                      historyRoot: true
                  });
                  appService.hideLoading();
           appService.showAlert("تمت عمليه التسجيل بنجاح");
          $state.go("tabsController.main");
      },function(err){
        appService.showAlert("خطأ",err.message)
      });
      
      
    }

}])