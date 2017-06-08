angular.module('app')
        .controller('myproductsCtrl', ['$scope', '$state', 'appService', '$timeout', '$interval', '$ionicHistory', function ($scope, $state, appService, $timeout, $interval, $ionicHistory) {
                $scope.myGoBack = function () {
                        $ionicHistory.goBack();
                }
                $scope.myproducts = [];
                var id;
                appService.showLoading("جاري التحميل");
                id = appService.profile.id;
                appService.getproductsBYstoreid(id, function (res) {
                        $scope.myproducts = res.data.data;
                        $scope.leng = function () {
                                if ($scope.myproducts.length == 0)
                                        return true;
                                else
                                        return false;
                        }
                        appService.hideLoading();
                }, function (err) {

                });



                $scope.addproduct = function () {
                        $state.go('addproduct');
                }

                $scope.deleteproduct = function (id) {
                        appService.deleteproduct(function (res) {
                                appService.hideLoading();
                                appService.showAlert(res.message)
                        }, function (err) {
                                console.log(err);
                        }, id)
                }

                $interval(function () {
                        appService.getproductsBYstoreid(id, function (res) {
                                updated = res.data.data;
                                if (updated.length != $scope.myproducts.length) {
                                        $scope.myproducts = updated;
                                }
                                appService.hideLoading();
                        }, function (err) {

                        });
                }, 10 * 10000);

                $scope.doRefresh = function () {

                        console.log('Refreshing!');
                        $timeout(function () {
                                appService.getproductsBYstoreid(id, function (res) {
                                        updated = res.data.data;
                                        if (updated.length != $scope.myproducts.length) {
                                                $scope.myproducts = updated;
                                        }
                                        appService.hideLoading();
                                }, function (err) {

                                });
                                $scope.$broadcast('scroll.refreshComplete');

                        }, 1000);
                }

        }])