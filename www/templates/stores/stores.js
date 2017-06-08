angular.module('app')
    .controller('storesCtrl', ['$scope', '$state', 'appService', '$timeout', '$interval', function ($scope, $state, appService, $timeout, $interval) {
        $scope.stores = [];
        updated = [];
        if (!appService.notuser) {
            if (appService.profile.level == "user")
                $scope.user = true;
            else
                $scope.user = false;
        }
        appService.showLoading("جاري التحميل");
        appService.allstore(function (res) {
            $scope.stores = res.data.data;
            appService.hideLoading();
        }, function (err) {
            appService.showAlert("خطأ");
        })

        $scope.navigate = function (id) {
            appService.storeId = id;
            $state.go('tabsController.productShow1', { 'id': 1 });
        }

        $scope.gotostoreprofile = function (id) {
            appService.profileid = id;
            $state.go('accountprofile');
        }
        $scope.subscribestore = function (id) {
            appService.checksubscribe(function (res) {
                appService.showAlert(res.message)
            }, function (err) {
                appService.subscribe(function (res) {
                    appService.showAlert(res.message)
                }, function (err) {
                    console.log(err);
                }, id)
            }, id)
        }

        $scope.doRefresh = function () {
            $timeout(function () {
                appService.allstore(function (res) {
                    $scope.stores = res.data.data;
                    appService.hideLoading();
                }, function (err) {
                    appService.showAlert("خطأ");
                })
                $scope.$broadcast('scroll.refreshComplete');

            }, 1000);
        }



    }])