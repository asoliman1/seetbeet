angular.module('app')
  .controller('productCtrl', ['$scope', '$state', 'appService', '$filter', '$ionicModal', '$ionicHistory', function ($scope, $state, appService, $filter, $ionicModal, $ionicHistory) {
    $scope.myGoBack = function () {
      $ionicHistory.goBack();
    }
    $scope.products = '';
    $scope.pics = [];
    var userid;
    $scope.user = false;
    var premium;
    var productid = appService.productid;
    $scope.notuser = appService.notuser;
    appService.showLoading("جاري التحميل");
    appService.getproductByid(productid, function (res) {
      premium = appService.type;
      console.log(premium)
      if (premium == "premium")
        $scope.user = false;
      else
        $scope.user = true;
      $scope.products = res.data.data[0];
      userid = $scope.products.user_id.id;
      $scope.pics = $scope.products.files
      appService.hideLoading();
    }, function (err) {

    })

    $scope.sendmessage = function () {
      $state.go('sendmessage');
      appService.message_to_userid = userid;
      console.log(appService.message_to_userid)
    }
    $scope.navigate = function () {
      if (appService.notuser)
        appService.showAlert("نرجو التسجيل معنا حتي تستطيع شراء المنتج");
      else {
        appService.showLoading("جاري الطلب");
        var date = new Date();
        $scope.date = $filter('date')(new Date(), 'dd/MM/yyyy');
        $scope.time = $filter('date')(new Date(), 'hh:mm:ss a');
        console.log(userid)
        $scope.invoice = {
          store_id: userid.toString(),
          orderdate: $scope.date.toString(),
          ordertime: $scope.time.toString(),
          postid: $scope.products.id.toString()
        }
        console.log($scope.invoice)
        if ($scope.invoice.comment == undefined)
          $scope.invoice.comment = "لا يوجد ملاحظات"
        appService.addinvoice($scope.invoice, function (res) {
          console.log(res);
          appService.hideLoading();
          appService.showAlert("تم طلب المنتج بنجاح");
        }, function (err) {
          console.log(err);
          appService.hideLoading();

        })


      }
    }

    $ionicModal.fromTemplateUrl('image-modal.html', {
      scope: $scope,
      animation: 'slide-in-up'
    }).then(function (modal) {
      $scope.modal = modal;
    });

    $scope.openModal = function () {
      $scope.modal.show();
    };

    $scope.closeModal = function () {
      $scope.modal.hide();
    };

    //Cleanup the modal when we're done with it!
    $scope.$on('$destroy', function () {
      $scope.modal.remove();
    });
    // Execute action on hide modal
    $scope.$on('modal.hide', function () {
      // Execute action
    });
    // Execute action on remove modal
    $scope.$on('modal.removed', function () {
      // Execute action
    });
    $scope.$on('modal.shown', function () {
      console.log('Modal is shown!');
    });


    $scope.showImage = function (index) {
      index = "http://s-baet.com/cp/upload/" + index
      $scope.imageSrc = index;
      $scope.openModal();
    }

  }])