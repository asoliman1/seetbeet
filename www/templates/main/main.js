angular.module('app')
    .controller('mainCtrl', ['$scope', '$state', 'appService', '$rootScope', '$ionicSlideBoxDelegate', '$ionicSideMenuDelegate', '$timeout', '$interval', function ($scope, $state, appService, $rootScope, $ionicSlideBoxDelegate, $ionicSideMenuDelegate, $timeout, $interval) {
        $scope.stores = [];
        var areas = [];
        $scope.nameofareas = [];
        var updated = [];
        var start, end;
        $scope.user;
        $ionicSideMenuDelegate.canDragContent(true);

        appService.showLoading("جاري تحميل المتاجر")
        appService.topstore(function (res) {
            $scope.stores = res.data;
            appService.hideLoading();
        }, function (err) {
            appService.showAlert("خطأ", err);
        });

        if (!appService.notuser) {

            if (appService.profile.level == "user")
                $scope.user = true;
            else
                $scope.user = false;

            appService.myprofile(function (res) {
                appService.profile = res;
            }, function (err) { })
        }
        $scope.navigate = function (id) {
            appService.storeId = id;
            $state.go('tabsController.productShow', { 'id': 0 });
        }

        $scope.gotostoreprofile = function (id) {
            appService.profileid = id;
            $state.go('accountprofile');
        }

        $scope.subscribestore = function (id) {
            appService.subscribe(function (res) {
                appService.showAlert(res.message)
            }, function (err) {
                console.log(err);
            }, id)
        }


        $scope.$on('$ionicView.afterEnter', function () {
            $rootScope.$emit('handleMenu', null);

        });



        $scope.doRefresh = function () {
            $timeout(function () {
                appService.topstore(function (res) {
                    updated = res.data;
                    if (updated.length != $scope.stores.length) {
                        $scope.stores = updated;
                    }
                    appService.hideLoading();
                }, function (err) {
                    appService.showAlert("خطأ", err);
                });
                $scope.$broadcast('scroll.refreshComplete');

            }, 1000);
        }



    }])