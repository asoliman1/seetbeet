angular.module('app')
    .controller('subscribtionsCtrl', ['$scope', '$state', 'appService', '$timeout', '$ionicHistory', function ($scope, $state, appService, $timeout, $ionicHistory) {
        $scope.stores = [];
        $scope.myGoBack = function () {
            $ionicHistory.goBack();
        }
        appService.showLoading("جاري التحميل");
        appService.getallsubscribtion(function (res) {
            $scope.stores = res.data.data;
            $scope.leng = function () {
                if ($scope.stores.length == 0)
                    return true;
                else
                    return false;
            }
            appService.hideLoading();
        }, function (err) {
            appService.showAlert("خطأ");
        })

        $scope.deletesubscribe = function (id) {
            appService.removesubscribe(function (res) {
                appService.showAlert(res.message)
            }, function (err) {
                console.log(res);
            }, id)
        }
        $scope.navigate = function (id) {
            appService.storeId = id;
            $state.go('tabsController.productShow1', { 'id': 1 });
        }
        var updated = [];
        $scope.doRefresh = function () {
            $timeout(function () {
                appService.getallsubscribtion(function (res) {
                    updated = res.data.data;
                    if (updated.length != $scope.stores.length) {
                        $scope.stores = updated;
                    }
                    appService.hideLoading();
                }, function (err) {
                    appService.showAlert("خطأ");
                })
                $scope.$broadcast('scroll.refreshComplete');

            }, 1000);
        }



    }])