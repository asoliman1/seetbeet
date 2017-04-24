(function(app){
    var appService = function($http, $q, $ionicPopup, $ionicLoading){


            
        var apiEndPoint = "http://217.182.113.163/~setalbeet/api/";

        var user = null;

        return{
           getApiLink: getApiLink,
           searchListByColumn: searchListByColumn,
           uploadFile: uploadFile,
           showLoading: showLoading,
           hideLoading: hideLoading,
           getPicture: getPic,
           showAlert: showAlert,
           call : call,
           register:register,
           login:login,
           activesms:activesms,
           contactUs:contactUs,
           topstore:topstore,
           allstore:allstore
        };


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
            console.log(data);
            if(data.status) success(data);
            else showAlert("خطأ",data.messages);;
          })
          .error(function (err) {
            console.log("HttpCaller:get:error:");
            console.log(err);
          } );
      }

      function post(url, data, success, error) {
        $http.post(url, data)
          .success(function (data) {
            console.log(data);
            if(data.status)
            {
                success(data);
            }
            
            else
             showAlert("خطأ",data.messages);
          })
          .error(function (err) {
            console.log("HttpCaller:post:error:");
            console.log(err);
            
          });
      }


        function uploadFile(url, file) {
            var fd = new FormData();
            fd.append('file', file);
            return $http.post(url,
                fd,
                {
                    withCredentials: true,
                    headers: { 'Content-Type': undefined },
                    transformRequest: angular.identity
                });
        }

      

        function getApiLink(){
            
            return 'http://217.182.113.163/~setalbeet/api/'
        }

        function searchListByColumn(list, columnName, value){
            for (var i = 0; i < list.length; i++) {
                var item = list[i];
                if(item["" +columnName] == value) return item;
            }
        }

        function showAlert(title, msg){
            var alertPopup = $ionicPopup.alert({
                title: title,
                template: msg
            });
            alertPopup.then(function(res) {
                console.log('alert shown');
            });
        }


     

        function showLoading(msg) {
            $ionicLoading.show({
                template: msg,
                duration: 1000
            }).then(function () {
                console.log("The loading indicator is now displayed");
            });
        }

       function hideLoading() {
            $ionicLoading.hide().then(function () {
                console.log("The loading indicator is now hidden");
            });
        }

        function getPic (options) {
            var q = $q.defer();
            navigator.camera.getPicture(function(result) {
                q.resolve(result);
            }, function(err) {
                q.reject(err);
            }, options);

            return q.promise;
      }



       function register(registrationObj, success, error){
    var url = getApiLink() + "register" + "?"
              + "name=" + registrationObj.name
              + "&email=" + registrationObj.email
              + "&mobile=" + registrationObj.mobile
              + "&password=" + registrationObj.password
              + "&password_confirmation=" + registrationObj.password_confirm
              + "&level=" + registrationObj.level;

    call(url, "POST", registrationObj , function(res) {
      success(res);
    }, function (err) {
      showAlert(err.message);
    });
  }

  function login(loginObj,success,error){
      var url = getApiLink() + "login" + "?"
      + "email=" + loginObj.email
      + "&password=" + loginObj.password ;


      call(url,"POST",loginObj,function(res){
          success(res);
      },function(err){
          showAlert(err.message);
      })
  }

  function activesms( code, success, error){
      var url = getApiLink()+"active/mobile/code"+"?"
      + "code=" + code ;


    call(url, "POST", code, function (res) {
        success(res)
    },
    function (err) {
      error(err);
    });
    }

    function contactUs(data,success,error){

                var url = getApiLink()+"contactus"+"?"
                    + "name=" + data.name
                    + "&email=" + data.email
                    + "&title=" + data.title
                    + "&content=" + data.content

            call(url,"POST",data,function(res){
                success(res)
            },function(err){
                error(err);
            });

            }

    function topstore(success,error){
        var url = getApiLink() + "top/store"

        call(url,"GET",function(){
            success(res)
        },function(){
            error(err)
        })
    }

     function allstore(success,error){
        var url = getApiLink() + "all/store"

        call(url,"GET",function(){
            success(res)
        },function(){
            error(err)
        })
    }








    }
    app.factory('appService', ['$http', '$q', '$ionicPopup', '$ionicLoading', appService]);
})(angular.module('app'));
