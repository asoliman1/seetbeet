angular.module('app')
    .controller('addproductCtrl', ['$scope', '$state', 'appService', '$cordovaImagePicker', '$ionicPlatform', '$ionicHistory', function ($scope, $state, appService, $cordovaImagePicker, $ionicPlatform, $ionicHistory) {

        $scope.myGoBack = function () {
            $ionicHistory.goBack();
        }
        $scope.departments = [];
        $scope.subdepartments = [];
        $scope.areas = [];
        $scope.states = [];
        $scope.countrys = [];
        $scope.product = {};
        var productphoto;
        var imageUri = [];
        var productid;
        appService.getdepartment(function (res) {
            $scope.departments = res.data;
        }, function (err) {

        })

        appService.getcountries(function (res) {
            $scope.states = res.data;
        }, function (err) {

        })

        appService.getAreas(function (res) {
            $scope.areas = res.data;
        }, function (err) {

        })


        $scope.selectcountry = function () {

            for (var i = 0; i < $scope.areas.length; i++) {
                if ($scope.product.areaid == $scope.areas[i].id) {
                    $scope.countrys = $scope.areas[i].city
                }
                else if ($scope.product.areaid == "") {
                    $scope.countrys = null;
                }
            }

        }

        $scope.selectsubdepartment = function () {
            for (var i = 0; i < $scope.departments.length; i++) {
                if ($scope.product.departmentid == $scope.departments[i].id) {
                    $scope.subdepartments = $scope.departments[i].parent
                }
                else if ($scope.product.departmentid == "") {
                    $scope.subdepartments = null;
                }
            }

        }




        $scope.save = function () {
            var flag = 0;
            if ($scope.product.cityid == undefined) {
                flag = 1;
                appService.showAlert("من فضلك ضع المدينه")

            }
            if ($scope.product.areaid == undefined) {
                flag = 1;
                appService.showAlert("من فضلك ضع المنطقه")
            }
            if ($scope.product.departmentid == undefined) {
                flag = 1;
                appService.showAlert("من فضلك ضع القسم")

            }
            if ($scope.product.title == undefined) {
                flag = 1;
                appService.showAlert("من فضلك ضع اسم المنتج")
            }

            if ($scope.product.post_type)
                $scope.product.post_type = "offer"
            else
                $scope.product.post_type = "order"
            if (flag != 1) {
                appService.showLoading("جاري التحميل")
                appService.addproduct($scope.product, function (res) {
                    productid = res.data.id;
                    appService.hideLoading();
                    appService.showLoading("جاري رفع الصور")
                    if (productphoto != null) {
                        appService.uploadFileAuthorized('upload?type=product&product_id=' + productid.toString(), productphoto, function (data) {

                        }, function (err) {
                            appService.showAlert("error")
                        });
                    }
                    if (imageUri != null) {
                        for (var i = 0; i < imageUri.length; i++) {
                            appService.uploadFileAuthorized('upload?type=single_photo&product_id=' + productid.toString(), imageUri[i], function (data) {

                            }, function (err) {
                                appService.showAlert("error")
                            });
                        }
                    }
                    appService.hideLoading()
                    $state.go('tabsController.main');
                    appService.showAlert(res.message);


                }, function (err) {
                    appService.hideLoading()
                })
            }

        }

        $scope.addpic = function (x) {
            var options = {
                maximumImagesCount: 1,
                width: 800,
                height: 800,
                quality: 80
            };
            if (x == 1) {
                options.maximumImagesCount = 1;
            }
            else {
                options.maximumImagesCount = 3;
            }
            cordova.plugins.diagnostic.requestCameraAuthorization({
                successCallback: function (status) {
                    $ionicPlatform.ready(function () {


                        $cordovaImagePicker.getPictures(options)
                            .then(function (results) {
                                if (x == 1)
                                    productphoto = results[0];
                                else
                                    imageUri = results;

                            }, function (error) {
                                // error getting photos
                            });

                    });
                },
                errorCallback: function (error) {
                    console.error(error);
                },
                externalStorage: true

            });



        };



    }])