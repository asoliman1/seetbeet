(function (app) {
  var appService = function ($http, $q, $ionicPopup, $ionicLoading) {


    var apiEndPoint = "http://s-baet.com/cp/api/";
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
      showLoading: showLoading,
      hideLoading: hideLoading,
      showAlert: showAlert,
      call: call,
      callAuthorized: callAuthorized,
      register: register,
      login: login,
      activesms: activesms,
      contactUs: contactUs,
      topstore: topstore,
      allstore: allstore,
      getnotifications: getnotifications,
      storeId: storeId,
      getproductsBYstoreid: getproductsBYstoreid,
      addproduct: addproduct,
      getproductByid: getproductByid,
      getdepartment: getdepartment,
      getAreas: getAreas,
      getcountries: getcountries,
      myprofile: myprofile,
      getprofile: getprofile,
      updateprofile: updateprofile,
      getnotify: getnotify,
      mymessages: mymessages,
      getmessage: getmessage,
      addmessage: addmessage,
      getabout: getabout,
      getrules: getrules,
      getexpire: getexpire,
      invoicesOfstore: invoicesOfstore,
      getinvoicesOfuser: getinvoicesOfuser,
      addinvoice: addinvoice,
      invoiceaction: invoiceaction,
      getbanner: getbanner,
      addreplay: addreplay,
      deletereplay: deletereplay,
      uploadFileAuthorized: uploadFileAuthorized,
      updatelocation: updatelocation,
      subscribe: subscribe,
      removesubscribe: removesubscribe,
      checksubscribe: checksubscribe,
      getallsubscribtion: getallsubscribtion,
      getallProductssubscribtion: getallProductssubscribtion,
      alloffer: alloffer,
      deleteproduct: deleteproduct,
      deletemessage: deletemessage,
      getprofilebyid: getprofilebyid,
      getalerts: getalerts
    };
    var storeId;
    var productid;
    var messageid;
    var invoiceid;
    var message_to_userid;
    var notuser = false;
    var profileid;
    var location;
    var type;
    var page;
    var paymoney;
    var profile = {};



    function saveAccessToken(access_token) {
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
        case "getprofile":
          getprofile(url, success, error);
          break;
        case "getnotify":
          getnotify(url, success, error)
          break;
      }
    }

    function callAuthorized(url, method, data, success, error) {
      var token = localStorage.getItem(tokenStr);
      if (token === null) return error("un-authorized");
      var fixedUrl = url.indexOf('?') === -1 ? url + '?' : '&';
      call(fixedUrl + 'api_token=' + token, method, data, success, error)
    }

    function getprofile(url, success, error) {
      $http.get(url)
        .success(function (data) {
          if (data.api_token != null) {
            success(data);
          }
          else {
            hideLoading();
            if (data.message)
              showAlert(data.message);
            else if (data.messages)
              showAlert(data.messages);
          }
        })
        .error(function (err) {
          hideLoading();
          showAlert("خطأ", "برجاء المحاوله مره اخري");
        });
    }

    function getnotify(url, success, error) {
      $http.get(url)
        .success(function (data) {
          success(data);
        })
        .error(function (err) {
          hideLoading();
          showAlert("خطأ", "برجاء المحاوله مره اخري");

        });
    }


    function get(url, success, error) {
      $http.get(url)
        .success(function (data) {
          if (data.status) {
            success(data);
          }
          else {
            hideLoading()
            if (data.message)
              showAlert(data.message);
            else if (data.messages)
              showAlert(data.messages);

          }
        })
        .error(function (err) {
          hideLoading();
          showAlert("خطأ", "برجاء المحاوله مره اخري");

        });
    }

    function post(url, data, success, error) {
      $http.post(url, data)
        .success(function (data) {
          if (data.status) {
            success(data);
          }
          else {
            hideLoading()
            if (data.message)
              showAlert(data.message);
            else if (data.messages)
              showAlert(data.messages);
          }

        })
        .error(function (err) {
          hideLoading();
          showAlert("خطأ", "برجاء المحاوله مره اخري");

        });
    }

    function uploadFileAuthorized(url, fileUri, success, error) {
      var token = localStorage.getItem(tokenStr);
      if (token === null) return error("un-authorized");

      var url = url.indexOf('?') === -1 ? url + '?' : url + '&';
      url = apiEndPoint + url + 'api_token=' + token;
      var options = {
        fileKey: "file",
        fileName: "file",
        headers: "Content-Type: multipart/form-data;",
        chunkedMode: false,
        mimeType: "image/png"
      };

      var ft = new FileTransfer();
      ft.upload(fileUri, url, success, error, options);
    }




    function getApiLink() {
      return 'http://s-baet.com/cp/api/'
    }

    function searchByid(id, array) {
      for (var i = 0; i < array.length; i++) {
        if (id === array[i].id)
          return array[i];
      }
    }

    function showAlert(title, msg) {
      var alertPopup = $ionicPopup.alert({
        title: title,
        template: msg,
        okText: 'تم'
      });
      alertPopup.then(function (res) {

      });
    }

    function showLoading(msg) {
      $ionicLoading.show({
        noBackdrop: true, duration: 10000,
        template: '<ion-spinner icon="spiral" ></ion-spinner> <br/> ' + msg,

      });
    }

    function hideLoading() {
      $ionicLoading.hide().then(function () {
        console.log("The loading indicator is now hidden");
      });
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
        error(err);
      });
    }

    function login(loginObj, success, error) {
      var url = getApiLink() + "login" + "?"
        + "email=" + loginObj.email
        + "&password=" + loginObj.password;


      call(url, "POST", loginObj, function (res) {
        success(res);
      }, function (err) {
        error(err);
      })
    }


    function activesms(code, success, error) {
      var url = getApiLink() + "active/mobile/code" + "?"
        + "code=" + code;


      call(url, "POST", code, function (res) {
        success(res)
      },
        function (err) {
          error(err);
        });
    }

    function contactUs(data, success, error) {

      var url = getApiLink() + "contactus" + "?"
        + "name=" + data.name
        + "&email=" + data.email
        + "&title=" + data.title
        + "&content=" + data.subjects;

      call(url, "POST", data, function (res) {
        success(res)
      }, function (err) {
        error(err);
      });

    }


    function topstore(success, error) {
      var url = getApiLink() + "top/store";
      call(url, "GET", "", function (res) {
        success(res);
      }, function (err) {
        error(err);
      })
    }

    function allstore(success, error) {
      var url = getApiLink() + "all/store"
      call(url, "GET", "", function (res) {
        success(res)
      }, function (err) {
        error(err);
      })
    }

    function alloffer(success, error) {
      var url = getApiLink() + "all/offers";
      call(url, "GET", "", function (res) {
        success(res)
      }, function (err) {
        error(err)
      })
    }


    function getproductsBYstoreid(Id, success, error) {
      var url = getApiLink() + "product/store/" + Id.toString();
      console.log(url)
      call(url, "GET", "", function (res) {
        success(res);
      }, function (err) {
        error(err);
      })

    }

    function getnotifications(success, error) {
      var url = getApiLink() + "notifcation"
      callAuthorized(url, "GETNOTIFY", "", function (res) {
        success(res);
      }, function (err) {
        error(err);
      })
    }

    function getAreas(success, error) {
      var url = getApiLink() + "area/city";
      call(url, "GET", "", function (res) {
        success(res);
      }, function (err) {
        error(err);
      })
    }

    function getcountries(success, error) {
      var url = getApiLink() + "countries/data";
      call(url, "GET", "", function (res) {
        success(res);
      }, function (err) {
        error(err)
      })
    }


    function getdepartment(success, error) {
      var url = getApiLink() + "department"
      call(url, "GET", "", function (res) {
        success(res);
      }, function (err) {
        error(err)
      })
    }

    function getproductByid(id, success, error) {
      var url = getApiLink() + "product/" + id.toString();
      call(url, "GET", "", function (res) {
        success(res)
      }, function (err) {
        error(err)
      })
    }



    function addproduct(productObj, success, error) {
      var url = getApiLink() + "add/product?api_token=" + localStorage.getItem(tokenStr)
        + "&title=" + productObj.title
        + "&price=" + productObj.price
        + "&area_id=" + productObj.cityid
        + "&city_id=" + productObj.areaid
        + "&post_type=" + productObj.post_type
        + "&department_id=" + productObj.departmentid
        + "&sub_dep=" + productObj.subdepartment
        + "&content=" + productObj.content
      console.log(url)
      call(url, "POST", productObj, function (res) {
        success(res);
      }, function (err) {
        error(err);
      })
    }








    function updateprofile(updateObj, success, error) {
      var url = getApiLink() + "update/account?api_token=" + localStorage.getItem(tokenStr)
        + "&type_account=" + updateObj.type;
      + "&name=" + updateObj.name
        + "&mobile=" + updateObj.mobile
        + "&password=" + updateObj.password
        + "&delivery=" + updateObj.delivery
        + "&phone=" + updateObj.phone
        + "&lat=" + updateObj.lat
        + "&lng=" + updateObj.lng
        + "&facebook=" + updateObj.facebook
        + "&google_plus=" + updateObj.google_plus
        + "&whatsapp=" + updateObj.whatsapp
        + "&instagram=" + updateObj.instagram
        + "&worktime_from=" + updateObj.other_mobile
        + "&worktime_to=" + updateObj.other_mobile
        + "&address=" + updateObj.address
        + "&other_mobile=" + updateObj.other_mobile

      call(url, "POST", updateObj, function (res) {
        success(res);
      }, function (err) {
        error(err);
      })
    }



    function myprofile(success, error) {
      var url = getApiLink() + "user";
      callAuthorized(url, "GETPROFILE", "", function (res) {
        success(res)
      }, function (err) {
        error(err);
      })
    }

    function mymessages(success, error) {
      var url = getApiLink() + "messages";
      callAuthorized(url, "GET", "", function (res) {
        success(res)
      }, function (err) {
        error(err)
      })
    }

    function getmessage(messageid, success, error) {
      var url = getApiLink() + "message/" + messageid.toString() + "?api_token=" + localStorage.getItem(tokenStr);
      console.log(url)
      call(url, "GET", "", function (res) {
        success(res)
      }, function (err) {
        error(err)
      })
    }

    function getabout(success, error) {
      var url = getApiLink() + "page/1";
      call(url, "GET", "", function (res) {
        success(res);
      }, function (err) {
        error(err);
      })
    }


    function getrules(success, error) {
      var url = getApiLink() + "page/2";
      call(url, "GET", "", function (res) {
        success(res);
      }, function (err) {
        error(err);
      })
    }

    function getexpire(success, error) {
      var url = getApiLink() + "expire/account"
      callAuthorized(url, "GET", "", function (res) {
        success(res);
      }, function (err) {
        error(err);
      })
    }

    function invoicesOfstore(success, error) {

      var url = getApiLink() + "invoices/store";

      callAuthorized(url, "GET", "", function (res) {
        success(res);
      }, function (err) {
        error(err);
      })
    }

    function getinvoicesOfuser(success, error) {
      var url = getApiLink() + "invoices/user";
      callAuthorized(url, "GET", "", function (res) {
        success(res);
      }, function (err) {
        error(err);
      })
    }

    function invoiceaction(success, error, obj) {
      var url = getApiLink() + "invoices/store/action?api_token=" + localStorage.getItem(tokenStr)
        + "&id=" + obj.id
        + "&status=" + obj.status
      console.log(url)
      call(url, "POST", obj, function (res) {
        success(res)
      }, function (err) {
        error(err)
      })
    }

    function addinvoice(obj, success, error) {
      var url = getApiLink() + "invoices/new?api_token=" + localStorage.getItem(tokenStr)
        + "&store_id=" + obj.store_id
        + "&comment=" + obj.comment
        + "&date_receipt=" + obj.orderdate
        + "&time_receipt=" + obj.ordertime
        + "&post_id=" + obj.postid
      console.log(url)
      call(url, "POST", obj, function (res) {
        success(res);
      }, function (err) {
        error(err);
      })
    }

    function addreplay(success, error, message, msgid) {
      var url = getApiLink() + "replay/message/" + msgid.toString() + "?api_token=" + localStorage.getItem(tokenStr)
        + "&message=" + message.reply;
      console.log(url)
      call(url, "POST", message.reply, function (res) {
        success(res)
      }, function (err) {
        error(err)
      })
    }

    function deletereplay(success, error, msgid, replayid) {
      var url = getApiLink() + "delete/replay/message/" + msgid.toString() + "?api_token=" + localStorage.getItem(tokenStr)
        + "&replay_id=" + replayid.toString();
      call(url, "POST", "", function (res) {
        success(res)
      }, function (err) {
        error(err)
      })
    }

    function addmessage(success, error, messageobj) {
      var url = getApiLink() + "new/message?api_token=" + localStorage.getItem(tokenStr)
        + "&title=" + messageobj.title
        + "&message=" + messageobj.message
        + "&to_user=" + messageobj.userid;
      call(url, "POST", messageobj, function (res) {
        success(res)
      }, function (err) {
        error(err);
      })
    }

    function deleteproduct(success, error, productid) {
      var url = getApiLink() + "delete/product?api_token=" + localStorage.getItem(tokenStr) + "&id=" + productid.toString();
      call(url, "POST", productid, function (res) {
        success(res);
      }, function (err) {
        error(err);
      })
    }

    function deletemessage(success, error, messageid) {
      var url = getApiLink() + "delete/message/" + messageid.toString() + "?api_token=" + localStorage.getItem(tokenStr);
      call(url, "POST", "", function (res) {
        success(res);
      }, function (err) {
        error(err);
      })
    }


    function updatelocation(success, error, coords) {
      var url = getApiLink() + "update/latlng?api_token=" + localStorage.getItem(tokenStr)
        + "&lat=" + coords.latitude
        + "&lng=" + coords.longitude;
      call(url, "POST", coords, function (res) {
        success(res);
      }, function (err) {
        error(err);
      })
    }

    function getprofilebyid(success, error, profileid) {
      var url = getApiLink() + "get/user/" + profileid.toString();
      call(url, "GET", "", function (res) {
        success(res);
      }, function (err) {
        error(err);
      })
    }

    function subscribe(success, error, storeid) {
      var url = getApiLink() + "subscribe/store/" + storeid.toString() + "?api_token=" + localStorage.getItem(tokenStr);
      call(url, "POST", "", function (res) {
        success(res);
      }, function (err) {
        error(err);
      })
    }

    function removesubscribe(success, error, storeid) {
      var url = getApiLink() + "remove/subscribe/store/" + storeid.toString() + "?api_token=" + localStorage.getItem(tokenStr);
      call(url, "POST", "", function (res) {
        success(res);
      }, function (err) {
        error(err);
      })
    }

    function checksubscribe(success, error, storeid) {
      var url = getApiLink() + "check/subscribe/store/" + storeid.toString() + "?api_token=" + localStorage.getItem(tokenStr);
      call(url, "GET", "", function (res) {
        success(res);
      }, function (err) {
        error(err);
      })
    }

    function getallsubscribtion(success, error) {
      var url = getApiLink() + "all/subscribtion?api_token=" + localStorage.getItem(tokenStr)
      call(url, "GET", "", function (res) {
        success(res);
      }, function (err) {
        error(err);
      })
    }

    function getallProductssubscribtion(success, error) {
      var url = getApiLink() + "all/product/stores?api_token=" + localStorage.getItem(tokenStr)
      call(url, "GET", "", function (res) {
        success(res);
      }, function (err) {
        error(err);
      })
    }
    function getalerts(success, error, type) {
      var url = getApiLink() + "count/unseen/" + type + "?api_token=" + localStorage.getItem(tokenStr)
      call(url, "GET", "", function (res) {
        success(res)
      }, function (err) {
        error(err)
      })
    }

    function getbanner(success, error) {
      var url = getApiLink() + "banners";
      call(url, "GET", "", function (res) {
        success(res)
      }, function (err) {
        error(err)
      })
    }



  };
  app.factory('appService', ['$http', '$q', '$ionicPopup', '$ionicLoading', appService]);
})(angular.module('app'));
