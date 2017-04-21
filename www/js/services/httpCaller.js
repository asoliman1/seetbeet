angular.module('app')
  .factory('httpCaller', ['$http', function ($http) {
    return {
      isCofigured: isCofigured,
      call : call
    };

    function isCofigured() {
      console.log("working ...");
    }


    function call(url, method, data, success, error) {
      var lowerMethod = method.toLowerCase();
      switch (lowerMethod){
        case "get": get(url, success, error); break;
        case "post": post(url, data, success, error); break;
      }
    }


    function get(url, success, error) {
      $http.get(url)
        .success(function (data) {
          console.log("HttpCaller:get:success:");
          console.log(data);
          if(data.status) success(data);
          else error(data);
        })
        .error(function (err) {
          console.log("HttpCaller:get:error:");
          console.log(err);
          error(errorToObject(err));
      } );
    }

    function post(url, data, success, error) {
      $http.post(url, data)
        .success(function (data) {
          console.log("HttpCaller:error:");
          console.log(data);
          success(data);
        })
        .error(function (err) {
          console.log("HttpCaller:post:error:");
          console.log(err);
          error(err);
        });
    }

  }]);
