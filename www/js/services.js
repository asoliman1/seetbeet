angular.module('app.services', [])

.factory('apiCaller', [ "httpCaller", "config", function(httpCaller, config){

  return apiCaller = {
    userType:{
      client: "premium",
      customer: "user"
    },
    login: login,
    register: register,
    activesms: activesms
  };

  function activesms(requestername, code, success, error){
    httpCaller.call(url, "POST", null, function (res) {
        success(res)
    },
    function (err) {
      error(err);
    });
    }



  function register(registrationObj, success, error){
    var url = config.register + "?"
              + "name=" + registrationObj.name
              + "&email=" + registrationObj.email
              + "&mobile=" + registrationObj.mobile
              + "&password=" + registrationObj.password
              + "&password_confirmation" + registrationObj.password
              + "&level=" + level;

    httpCaller.call(url, "POST", null, function (res) {
      success(res);
    }, function (err) {
      error(err.message);
    });
  }

 

}]);
