(function (app) {
  var appService = function ($http, $q, $ionicPopup, $ionicLoading) {


    var apiEndPoint = "http://217.182.113.163/~setalbeet/api/";
    var tokenStr = "token";
    var targetStateAfterLogin = "tabsController.main";
    var user = null;

    return {
      targetStateAfterLogin: targetStateAfterLogin,
      tokenStr: tokenStr,
      saveAccessToken: saveAccessToken,
      signOut: signOut,
      getApiLink: getApiLink,
      searchByid: searchByid,
      uploadFile: uploadFile,
      showLoading: showLoading,
      hideLoading: hideLoading,
      getPicture: getPic,
      showAlert: showAlert,
      call: call,
      callAuthorized: callAuthorized,
      register: register,
      login: login,
      activesms: activesms,
      contactUs: contactUs,
      topstore: topstore,
      allstore: allstore,
      getnotifications:getnotifications,
      storeId:storeId,
      getproductsBYstoreid:getproductsBYstoreid,
      addproduct:addproduct,
      getproductByid:getproductByid,
      getdepartment:getdepartment,
      getAreas:getAreas,
      getcountries:getcountries,
      myprofile:myprofile,
      getprofile:getprofile,
      updateprofile:updateprofile,
      getproductsOfstore:getproductsOfstore,
      getnotify:getnotify,
      mymessages:mymessages,
      getmessage:getmessage,
      getabout:getabout,
      getrules:getrules,
      getexpire:getexpire
   //  addreply:addreply,
    //   deletereply:deletereply
    };
    var storeId;

    function saveAccessToken(access_token){
      localStorage.setItem(tokenStr, access_token);
    }

    function signOut() {
      localStorage.removeItem(tokenStr);
    }

    function call(url, method, data, success, error) {
      var lowerMethod = method.toLowerCase();
      switch (lowerMethod) {
        case "get":
          get(url, success, error);
          break;
        case "post":
          post(url, data, success, error);
          break;
          case"getprofile":
          getprofile(url,success,error);
          break;
          case"getnotify":
          getnotify(url,success,error)
          break;
      }
    }

    function callAuthorized(url, method, data, success, error) {
      var token = localStorage.getItem(tokenStr);
      if(token === null) return error("un-authorized");
      var fixedUrl = url.indexOf('?') === -1 ? url + '?' : '&';
      call(fixedUrl+'api_token='+token, method, data, success, error)
    }

    function getprofile(url, success, error) {
      $http.get(url)
        .success(function (data) {
          if (data.api_token!=null) {
            console.log(data);
            success(data);
          }
          else {
            showAlert("خطأ", data.message);
          } 
        })
        .error(function (err) {
          showAlert("خطأ","تأكد من الأتصال بالأنترنت");
          console.log(err);
        });
    }

    function getnotify(url, success, error) {
      $http.get(url)
        .success(function (data) {
          console.log(data);
            success(data);
        })
        .error(function (err) {
          showAlert("خطأ","تأكد من الأتصال بالأنترنت");
          console.log(err);
        });
    }


    function get(url, success, error) {
      $http.get(url)
        .success(function (data) {
          if (data.status) {
            console.log(data);
            success(data);
          }
          else {
            showAlert("خطأ", data.message);
          } 
        })
        .error(function (err) {
          showAlert("خطأ","تأكد من الأتصال بالأنترنت");
          console.log(err);
        });
    }

    function post(url, data, success, error) {
      $http.post(url, data)
        .success(function (data) {
          if (data.status) {
            console.log(data);
            success(data);
          }
          else
            showAlert("خطأ", data.message);
        })
        .error(function (err) {
         showAlert("خطأ","تأكد من الأتصال بالأنترنت");
          console.log(err);

        });
    }

    function uploadFile(type, file , success , error) {
      var url = "http://217.182.113.163/~setalbeet/api/upload?api_token="+localStorage.getItem(tokenStr)+"&"
      +"type="+type+"&"+"file="+file;
      var fd = new FormData();
      fd.append('file', file);
      return $http.post(url,
        fd,
        {
          withCredentials: true,
          headers: {'Content-Type': undefined},
          transformRequest: angular.identity
        }).success(function(data){
          console.log(data);
        }).error(function(err){
          console.log(err);
        })
    }

    function getApiLink() {
      return 'http://217.182.113.163/~setalbeet/api/'
    }

    function searchByid(id,array) {
      for (var i = 0; i < array.length; i++) {
       if (id===array[i].id)
            return array[i];
    }}

    function showAlert(title, msg) {
      var alertPopup = $ionicPopup.alert({
        title: title,
        template: msg
      });
      alertPopup.then(function (res) {
        
      });
    }

    function showLoading(msg,time) {
      $ionicLoading.show({
        template: msg,
        duration: time
      }).then(function () {
      });
    }

    function hideLoading() {
      $ionicLoading.hide().then(function () {
        console.log("The loading indicator is now hidden");
      });
    }

    function getPic(options) {
      var q = $q.defer();
      navigator.camera.getPicture(function (result) {
        q.resolve(result);
      }, function (err) {
        q.reject(err);
      }, options);

      return q.promise;
    }

    function register(registrationObj, success, error) {
      var url = getApiLink() + "register" + "?"
        + "name=" + registrationObj.name
        + "&email=" + registrationObj.email
        + "&mobile=" + registrationObj.mobile
        + "&password=" + registrationObj.password
        + "&password_confirmation=" + registrationObj.password_confirm
        + "&level=" + registrationObj.level;

      call(url, "POST", registrationObj, function (res) {
        success(res);
      }, function (err) {
        showAlert(err.message);
      });
    }

    function login(loginObj, success, error) {
      var url = getApiLink() + "login" + "?"
        + "email=" + loginObj.email
        + "&password=" + loginObj.password;


      call(url, "POST", loginObj, function (res) {
        success(res);
      }, function (err) {
        showAlert(err.message);
      })
    }

    function activesms(code, success, error) {
      var url = getApiLink() + "active/mobile/code" + "?"
        + "code=" + code;


      call(url, "POST", code, function (res) {
          success(res)
        },
        function (err) {
          showAlert(err.message);
        });
    }

    function contactUs(data, success, error) {

      var url = getApiLink() + "contactus" + "?"
        + "name=" + data.name
        + "&email=" + data.email
        + "&title=" + data.title
        + "&content=" + data.subjects  ;

      call(url, "POST", data, function (res) {
        success(res)
      }, function (err) {
        showAlert(err.message);
      });

    }

    function topstore(success, error) {
      var url = getApiLink() + "top/store";
      call(url, "GET","", function (res) {
        success(res);
      }, function (err) {
        showAlert(err.message);
      })
    }

    function allstore(success, error) {
      var url = getApiLink() + "all/store"
      call(url, "GET","", function (res) {
        success(res)
      }, function (err) {
        showAlert(err.message);
      })
    }


    function getproductsBYstoreid(storeId,success,error) {
      var url = getApiLink()+ "product/store/"+storeId.toString() ;
      console.log(url)
      call(url, "GET","", function(res){
        success(res);
      },function(err){
        showAlert(err.message);
      })

    }

    function getnotifications(success,error){
      var url = getApiLink() + "notifcation"
      callAuthorized(url,"GETNOTIFY","",function(res){
          success(res);
      },function(err){
        error(err);
      })
    }

    function getAreas(success,error){
      var url = getApiLink() + "area/city" ;
      call(url,"GET","",function(res){
          success(res);
      },function(err){
        showAlert(err.message);
      })
    }
    
    function getcountries(success,error){
      var url = getApiLink() + "countries/data" ;
      call(url,"GET","",function(res){
          success(res);
      },function(err){
        error(err)
      })
    }
    

    function getdepartment(success,error){
      var url = getApiLink()+"department"
      call(url,"GET","",function(res){
        success(res);
      },function(err){
        error(err)
      })
    }

    function getproductByid(id,success,error){
      var url = getApiLink()+"product/"+id.toString();
      call(url,"GET","",function(res){
        success(res)
      },function(err){
        error(err)
      })
    }



    function addproduct (productObj,success,error){
      var url = getApiLink() + "add/product?api_token=" + localStorage.getItem(tokenStr); 
      +"title="+ productObj.title
      +"&price="+productObj.price
      +"&area_id="+ productObj.areaid
      +"&city_id="+ productObj.cityid
      +"&post_type="+productObj.posttype
      +"&department_id="+productObj.departmentid
      +"&sub_dep="+productObj.subdepartment
      +"&content="+productObj.subject
      +"&photo=" +productObj.photo
      +"&other_photo[]="+productObj.other_photo ;

      call(url,"POST",productObj,function(res){
        success(res);
      },function(err){
        error(err);
      })
    }



      function getproductsOfstore(success,error){
        var url = getApiLink()+"all/product/stores"
        callAuthorized(url,"GET","",function(res){
            success(res);
        },function(err){
            error(err);
        })
      }



 

    function updateprofile(updateObj,success,error){
      var url = getApiLink() + "update/account" 
      + "name=" + updateObj.name
      + "&mobile=" + updateObj.mobile
      + "&password=" + updateObj.password
      + "&password_confirmation=" + updateObj.password_confirm
      + "&logo=" + updateObj.logo
      + "&delivery=" + updateObj.delivery
      + "&phone=" + updateObj.phone
      + "&lat=" + updateObj.lat
      + "&lng=" + updateObj.lng
      + "&facebook=" + updateObj.facebook
      + "&other_mobile=" + updateObj.other_mobile;

      callAuthorized (url,"POST",updateObj,function(res){
        success(res);
      },function(err){
        error(err);
      })
    }

    

    function myprofile(success,error){
      var url = getApiLink()+"user";
      callAuthorized(url,"GETPROFILE","",function(res){
        success(res)
      },function(err){
        error(err);
      })
    }

    function mymessages(success,error){
      var url = getApiLink()+"messages";
      callAuthorized(url,"GET","",function(res){
        success(res)
      },function(err){
        error(err)
      })
    }

    function getmessage(storeId,success,error){
      var url = getApiLink()+"messages/"+storeId.toString();
      callAuthorized(url,"GET","",function(res){
          success(res)
      },function(err){
        error(err)
      })
    }

    function getabout(success,error){
      var url = getApiLink()+"page/1";
      call(url,"GET","",function(res){
        success(res);
      },function(err){
        error(err);
      })
    }


    function getrules(success,error){
      var url = getApiLink()+"page/2";
      call(url,"GET","",function(res){
        success(res);
      },function(err){
        error(err);
      })
    }

    function getexpire(success,error){
      var url = getApiLink()+"expire/account"
      callAuthorized(url,"GET","",function(res){
        success(res);
      },function(err){
        error(err);
      })
    }

  /*  function addreply(storeId,success,error){
      var url = getApiLink()+"replay/message/"+storeId.toString();
      callAuthorized(url,"POST","",function(res){
          success(res)
      },function(err){
        error(err)
      })
    }

    function deletereply(storeId,success,error){
      var url = getApiLink()+"replay/message/"+storeId.toString();
      callAuthorized(url,"GET","",function(res){
          success(res)
      },function(err){
        error(err)
      })
    }
    */


  
  };
  app.factory('appService', ['$http', '$q', '$ionicPopup', '$ionicLoading', appService]);
})(angular.module('app'));
