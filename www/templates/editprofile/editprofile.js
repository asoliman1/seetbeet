angular.module('app')
    .controller('editprofileCtrl', ['$scope', '$state', 'appService', '$cordovaCamera', '$ionicModal', '$ionicHistory', function ($scope, $state, appService, $cordovaCamera, $ionicModal, $ionicHistory) {
        $scope.myGoBack = function () {
            $ionicHistory.goBack();
        }
        $scope.myprofile = {};
        $scope.states = [];
        $scope.areas = [];

        $scope.myprofile = appService.profile;
        $scope.type = function () {
            if ($scope.myprofile.level == "premium")
                return true
            else
                return false;
        }
      
        $scope.myprofile.area = $scope.myprofile.area.id;
        $scope.myprofile.city = $scope.myprofile.city.id;
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
                if ($scope.myprofile.area == $scope.areas[i].id) {
                    $scope.countrys = $scope.areas[i].city
                }
                else if ($scope.myprofile.area == "") {
                    $scope.countrys = null;
                }
            }

        }



        $scope.update = function () {
            $scope.myprofile.type = $scope.myprofile.level
            appService.showLoading("جاري التحميل");
            appService.updateprofile($scope.myprofile, function (res) {
                appService.hideLoading();
                appService.showAlert("تم التعديل بنجاح");
                $state.go('tabsController.main');
            }, function (err) {
                appService.hideLoading()
                appService.showAlert("لم يتم التعديل بنجاح ");

            })
        }


        $scope.setImage = function () {

            var options = {
                quality: 50,
                destinationType: Camera.DestinationType.FILE_URI,
                sourceType: Camera.PictureSourceType.PHOTOLIBRARY,
                targetWidth: 200,
                targetHeight: 200
            };

            $cordovaCamera.getPicture(options).then(function (imageUri) {
                console.log('img', imageUri);

                appService.uploadFileAuthorized('upload?type=user', imageUri, function (data) {
                    console.log('upload image success');
                    console.log(data);
                }, function (err) {
                    console.log('upload image error');
                    console.log(err);
                });
            }, function (err) {
                // error
            });

        };


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