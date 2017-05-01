angular.module('app.routes', [])

.config(function($stateProvider, $urlRouterProvider) {

  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
  $stateProvider
    
  

   .state('tabsController', {
    url: '/tabs',
    templateUrl: 'templates/tabsController.html',
    abstract:true
  })

  .state('login1', {
    url: '/login1',
      nativeTransitions:  {
    "type"          : "fade",
    "duration"      :  500,// 'open|close', default 'open', note that close is not behaving nicely on Crosswalk
 },
    templateUrl: 'templates/login/login1.html',
    controller: 'login1Ctrl'
  })

  .state('login0', {
    url: '/login0',
      nativeTransitions:  {
    "type"          : "fade",
    "duration"      :  500,// 'open|close', default 'open', note that close is not behaving nicely on Crosswalk
 },
    templateUrl: 'templates/login/login0.html',
    controller: 'login0Ctrl'
  })

  

  .state('verify', {
    url: '/verify',
    templateUrl: 'templates/signup/verify.html',
    controller: 'signupCtrl'

  })

  .state('signup', {
    url: '/signup',
    nativeTransitions:  {
    "type"          : "fade",
    "duration"      :  500,// 'open|close', default 'open', note that close is not behaving nicely on Crosswalk
 },
    templateUrl: 'templates/signup/signup.html',
    controller: 'signupCtrl'
  })


  .state('notifications', {
    url: '/notifications',
    templateUrl: 'templates/notifications/notifications.html',
    controller: 'notificationsCtrl'
  })

  

  .state('tabsController.stores', {
    url: '/stores',
    views: {
      'tab1': {
        templateUrl: 'templates/stores/stores.html',
        controller: 'storesCtrl'
      }
    }
  })

  .state('tabsController.contactUs', {
    url: '/contactUs',
    views: {
      'tab4': {
        templateUrl: 'templates/contactUs/contactUs.html',
        controller: 'contactUsCtrl'
      }
    }
  })

  .state('productShow', {      
    url: '/productShow',
    templateUrl: 'templates/productShow/productShow.html',
    controller: 'productShowCtrl'
  })

   .state('product', {      
    url: '/product',
    templateUrl: 'templates/productShow/product/product.html',
    controller: 'productCtrl'
  })

  .state('tabsController.offers', {
    url: '/offers',
    views: {
      'tab2': {
        templateUrl: 'templates/offers.html'
        
      }
    }
  })

  .state('fees', {
    url: '/fees',
    templateUrl: 'templates/fees/fees.html',
    controller: 'feesCtrl'
  })

  .state('profile', {
    url: '/profile',
    templateUrl: 'templates/profile/profile.html',
    controller: 'profileCtrl'
  })

  .state('about', {
    url: '/about',
    templateUrl: 'templates/about.html'
  
  })

  .state('getlocation', {
    url: '/getlocation',
    templateUrl: 'templates/getlocation/getlocation.html',
    controller: 'GeoCtrl'
  
  })

  .state('addproduct', {
    url: '/addproduct',
    templateUrl: 'templates/productShow/addProduct/addproduct.html' ,
    controller: 'addproductCtrl'
  
  })

  .state('myproducts', {
    url: '/myproducts',
    templateUrl: 'templates/productShow/myproducts/myproducts.html' ,
    controller: 'myproductsCtrl'
  
  })

  .state('mymessages', {
    url: '/mymessages',
    templateUrl: 'templates/mymessages/mymessages.html' ,
    controller: 'mymessagesCtrl'
  
  })

  .state('message', {
    url: '/message',
    templateUrl: 'templates/mymessages/showmessage/showmessage.html' ,
    controller: 'messageCtrl'
  
  })
  
  .state('editprofile', {

    url: '/editprofile',
    templateUrl: 'templates/editprofile/editprofile.html',
    controller: 'editprofileCtrl'
      
  })

 .state('tabsController.main', {
    url: '/main',
      nativeTransitions:  {
    "type"          : "fade",
    "duration"      :  500,// 'open|close', default 'open', note that close is not behaving nicely on Crosswalk
 },
    views: {
      'tab5': {
        templateUrl: 'templates/main/main.html',
        controller: 'mainCtrl'
      }
    }
  })


$urlRouterProvider.otherwise('/login0')

  

});