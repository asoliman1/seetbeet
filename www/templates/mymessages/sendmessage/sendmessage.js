angular.module('app')
        .controller('sendmessageCtrl', ['$scope', '$state', 'appService', '$ionicHistory', function ($scope, $state, appService, $ionicHistory) {
                $scope.myGoBack = function () {
                        $ionicHistory.goBack();
                }
                $scope.message = {};
                $scope.addmessage = function () {
                        console.log("ih")
                        appService.showLoading("جاري ارسال الرساله");
                        $scope.message.userid = appService.message_to_userid;
                        appService.addmessage(function (res) {
                                appService.hideLoading();
                                appService.showAlert("تم ارسال الرساله بنجاح")
                                $state.go('tabsController.product');
                        }, function (err) {

                        }, $scope.message)
                }



        }])