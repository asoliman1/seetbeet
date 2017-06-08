angular.module('app')
        .controller('contactUsCtrl', ['$scope', '$state', 'appService', function ($scope, $state, appService) {

                $scope.contact = {
                        name: '',
                        email: '',
                        title: '',
                        subject: ''
                }
                $scope.submit = function () {
                        appService.contactUs($scope.contact, function () {
                                appService.showAlert("اتصل بنا", "تم الارسال بنجاح");
                        }, function () {
                                console.log("fail to send message");
                        })
                }


        }])