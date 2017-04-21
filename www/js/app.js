
angular.module('app', ['ionic', 'ionic.cloud', 'app.routes','app.directives'])

.config(function($ionicConfigProvider, $sceDelegateProvider, $ionicCloudProvider){
   $ionicCloudProvider.init({
    "core": {
      "app_id": "9dac2eaf"
    } ,
    "push": {
      "sender_id": "591234183534",
      "pluginConfig": {
        "ios": {
          "badge": true,
          "sound": true
        },
        "android": {
          "iconColor": "#343434"
        }}}
  });
  
    $ionicConfigProvider.backButton.text('').previousTitleText(false);
  

  $sceDelegateProvider.resourceUrlWhitelist([ 'self','*://www.youtube.com/**', '*://player.vimeo.com/video/**']);

})


.controller('menuCtrl', ['$scope', '$state', function($scope, $state) {
   
   $scope.navigateMenu = function (a){
     if(a==1)
     $state.go('tabsController.main');
     else if(a==2)
     $state.go('productShow');
     else if(a==3)
     $state.go('addProduct');
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

}])





.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {

      setTimeout(function() {
        navigator.splashscreen.hide();
    }, 3000);
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);
    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
  });
})

/*
  This directive is used to disable the "drag to open" functionality of the Side-Menu
  when you are dragging a Slider component.
*/
.directive('disableSideMenuDrag', ['$ionicSideMenuDelegate', '$rootScope', function($ionicSideMenuDelegate, $rootScope) {
    return {
        restrict: "A",  
        controller: ['$scope', '$element', '$attrs', function ($scope, $element, $attrs) {

            function stopDrag(){
              $ionicSideMenuDelegate.canDragContent(false);
            }

            function allowDrag(){
              $ionicSideMenuDelegate.canDragContent(true);
            }

            $rootScope.$on('$ionicSlides.slideChangeEnd', allowDrag);
            $element.on('touchstart', stopDrag);
            $element.on('touchend', allowDrag);
            $element.on('mousedown', stopDrag);
            $element.on('mouseup', allowDrag);

        }]
    };
}])

/*
  This directive is used to open regular and dynamic href links inside of inappbrowser.
*/
.directive('hrefInappbrowser', function() {
  return {
    restrict: 'A',
    replace: false,
    transclude: false,
    link: function(scope, element, attrs) {
      var href = attrs['hrefInappbrowser'];

      attrs.$observe('hrefInappbrowser', function(val){
        href = val;
      });
      
      element.bind('click', function (event) {

        window.open(href, '_system', 'location=yes');

        event.preventDefault();
        event.stopPropagation();

      });
    }
  };
});