angular.module('app',[])
  .factory('config', [ function(){

  var apiEndPoint = "http://217.182.113.163/~setalbeet/api/";

  return constants = {
    register: apiEndPoint + "register" ,
    login: apiEndPoint + "login"
  }
}]);

