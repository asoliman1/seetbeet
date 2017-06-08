angular.module('app')
    .controller('tabsCtrl', ['$scope', '$state', 'appService', function ($scope, $state, appService) {

        $scope.banners = [];
        appService.getbanner(function (res) {
            $scope.banners = res.data;
        }, function (err) {
            appService.showAlert("خطأ", "يرجي التأكد من توصيل الأنترنت");
        })


    }])