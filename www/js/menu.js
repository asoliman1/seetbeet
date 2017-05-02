angular.module('app')
.controller('menuCtrl', ['$scope', '$state', 'appService','$ionicHistory','$cordovaInAppBrowser',function($scope, $state ,appService,$ionicHistory,$cordovaInAppBrowser) {
       $scope.myprofile='';
      $scope.premium=false;
      $scope.user=false;
      var api_token='';
      $scope.navigateMenu=function(a){
                if(a==1)
                $state.go('tabsController.main');
              else if(a==2)
                $state.go('myproducts');
               else if(a==3)
                $state.go('addproduct');
               else if(a==4)
                $state.go('getlocation');
               else if(a==5)
                $state.go('notifications');
               else if(a==6)
                $state.go('about');
                else if ( a==7){
                   var options = {
                      location: 'yes',
                      clearcache: 'yes',
                      toolbar: 'no'
                    };
                  $cordovaInAppBrowser.open('http://217.182.113.163/~setalbeet/api/renewal?api_token='+api_token, '_system', options)
                    .then(function(event) {
                      console.log("succes");
                    })
                    .catch(function(event) {
                      // error
                    });


    $cordovaInAppBrowser.close();


                }
               else if(a==8){
                  $ionicHistory.clearCache();
                  $ionicHistory.clearHistory();
                  $ionicHistory.nextViewOptions({
                      disableBack: true,
                      historyRoot: true
                  });
                    appService.signOut();
                    $state.go('login0');
                    
               }
               else if(a==9)
                $state.go('profile');
                else if(a==10)
                $state.go('editprofile');
                else if(a==11)
                $state.go('mymessages')
                else if(a==12)
                $state.go('signup')
            }
    
         
             appService.myprofile(function(res){
               api_token=res.api_token;
                $scope.myprofile=res;
              if(res.api_token!=null){
                  if(res.level=="premium")
                        $scope.premium=true;
                        else
                        $scope.user=true;
              }   
              appService.hideLoading();
              console.log($scope.user);
              console.log($scope.premium)
            },function(err){
              console.log(err)
            })
        
            
            


}])