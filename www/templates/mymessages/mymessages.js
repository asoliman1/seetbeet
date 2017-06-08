angular.module('app')
        .controller('mymessagesCtrl', ['$scope', '$state', 'appService', '$timeout', '$interval', '$ionicHistory', function ($scope, $state, appService, $timeout, $interval, $ionicHistory) {
                $scope.myGoBack = function () {
                        $ionicHistory.goBack();
                }
                $scope.mymessages = []; var seen_counter = 0;
                appService.showLoading("جاري تحميل الرسائل");
                appService.mymessages(function (res) {
                        $scope.mymessages = res.data.data;
                        $scope.leng = function () {
                                if ($scope.mymessages.length == 0)
                                        return true;
                                else
                                        return false;
                        }
                        appService.hideLoading();
                }, function (err) {
                        console.log(err)
                })
                $scope.navigate = function (id) {
                        appService.messageid = id;
                        $state.go('message')
                }

                $scope.deletemessage = function (id) {
                        appService.showLoading("جاري حذف الرساله")
                        appService.deletemessage(function (res) {
                                appService.hideLoading();
                                appService.showAlert(res.message)
                        }, function (err) {

                        }, id)
                }

                $interval(function () {
                        appService.mymessages(function (res) {
                                updated = res.data.data;
                                var flag = 0;
                                if (updated.length != $scope.mymessages.length) {
                                        $scope.mymessages = updated;
                                        flag = 1;
                                }
                                if (flag == 1) {
                                        for (var i = 0; i < updated.length; i++) {
                                                if (updated[i].seen == 0)
                                                        seen_counter = seen_counter + 1;
                                        }
                                        appService.msg_seen = seen_counter;
                                }
                                $scope.leng = function () {
                                        if ($scope.mymessages.length == 0)
                                                return true;
                                        else
                                                return false;
                                }
                                appService.hideLoading();
                        }, function (err) {
                                console.log(err)
                        })
                }, 1 * 10000);

                $scope.doRefresh = function () {
                        $timeout(function () {
                                appService.mymessages(function (res) {
                                        $scope.mymessages = res.data.data;
                                        appService.hideLoading();
                                }, function (err) {
                                        console.log(err)
                                })
                                $scope.$broadcast('scroll.refreshComplete');

                        }, 1000);
                }


        }])