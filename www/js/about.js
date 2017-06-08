angular.module('app')
    .controller('aboutCtrl', ['$scope', '$state', 'appService', '$ionicHistory', '$ionicPlatform', function ($scope, $state, appService, $ionicHistory, $ionicPlatform) {
        $scope.myGoBack = function () {
            $ionicHistory.goBack();
        }

        $scope.about = '';
        appService.getabout(function (res) {
            $scope.about = res.data.content;
        }, function (err) {
        })


    }])