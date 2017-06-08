angular.module('app')
    .controller('productShowCtrl', ['$scope', '$state', 'appService', '$ionicHistory', '$stateParams', '$timeout', function ($scope, $state, appService, $ionicHistory, $stateParams, $timeout) {
        $scope.myGoBack = function () {
            $ionicHistory.goBack();
        }
        $scope.products = [];
        var storeid = appService.storeId;
        appService.showLoading("جاري التحميل");
        appService.getproductsBYstoreid(storeid, function (res) {
            $scope.products = res.data.data;
            $scope.leng = function () {
                if ($scope.products.length == 0)
                    return true;
                else
                    return false;
            }
            appService.hideLoading();
        }, function (err) {

        });


        $scope.navigate = function (id) {
            appService.productid = id;

            if ($stateParams.id == 1)
                $state.go('tabsController.product1');
            else
                $state.go('tabsController.product');
        };



        $scope.doRefresh = function () {

            $timeout(function () {
                appService.getproductsBYstoreid(storeid, function (res) {
                    $scope.products = res.data.data;
                    $scope.leng = function () {
                        if ($scope.products.length == 0)
                            return true;
                        else
                            return false;
                    }
                    appService.hideLoading();
                }, function (err) {

                });
                $scope.$broadcast('scroll.refreshComplete');

            }, 1000);
        }


    }])