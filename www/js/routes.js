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
    templateUrl: 'templates/login/login1.html',
    controller: 'login1Ctrl'
  })

  .state('login0', {
    url: '/login0',
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
    templateUrl: 'templates/productShow/productshow.html',
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
  
  .state('tabsController.editprofile', {
    url: '/editprofile',
    views: {
      'tab3': {
        templateUrl: 'templates/editprofile/editprofile.html',
        controller: 'editprofileCtrl'
      }
    }
  })

 .state('tabsController.main', {
    url: '/main',
    views: {
      'tab5': {
        templateUrl: 'templates/main/main.html',
        controller: 'mainCtrl'
      }
    }
  })


$urlRouterProvider.otherwise('/login0')

  

});