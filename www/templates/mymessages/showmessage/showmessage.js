angular.module('app')
        .controller('messageCtrl', ['$scope', '$state', 'appService', '$timeout', '$interval', '$ionicHistory', function ($scope, $state, appService, $timeout, $interval, $ionicHistory) {
                $scope.myGoBack = function () {
                        $ionicHistory.goBack();
                }
                $scope.mymessage = '';
                $scope.message = {};
                $scope.replays = [];
                var messageid = appService.messageid;
                appService.showLoading("جاري تحميل الرسائل");
                appService.getmessage(messageid, function (res) {
                        $scope.mymessage = res.data.message;
                        $scope.replays = res.data.replay.data;
                        appService.hideLoading();
                }, function (err) {
                        appService.hideLoading();
                        console.log(err)
                })
                $scope.send = function () {
                        appService.showLoading("جاري الارسال");
                        appService.addreplay(function (res) {
                                appService.hideLoading();
                                appService.showAlert("تم الرد");
                        }, function (err) {
                                console.log(err);
                                appService.hideLoading();
                        }, $scope.message, messageid)
                }
                $scope.deletereplay = function (replayid, msg_id) {
                        appService.showLoading("جاري مسح الرد");
                        appService.deletereplay(function (res) {
                                appService.showAlert(res.message)
                                appService.hideLoading();
                        }, function (err) {
                                console.log(err);
                                appService.hideLoading();
                        }, msg_id, replayid)
                }
                var updated = [];
                $scope.doRefresh = function () {
                        $timeout(function () {
                                appService.getmessage(messageid, function (res) {
                                        updated = res.data.replay.data
                                        if (updated.length != $scope.replays.length) {
                                                $scope.replays = updated;
                                        }
                                        appService.hideLoading();
                                }, function (err) {
                                        appService.hideLoading();
                                        console.log(err)
                                })
                                $scope.$broadcast('scroll.refreshComplete');

                        }, 1000);
                }


        }])