angular.module('app')
    .controller('invoicesCtrl', ['$scope', '$state', 'appService', '$timeout', '$interval', '$ionicHistory', function ($scope, $state, appService, $timeout, $interval, $ionicHistory) {
        $scope.myGoBack = function () {
            $ionicHistory.goBack();
        }
        $scope.invoices = [];
        updated = []
        var storeid;
        var invoiceOfstoreid;
        $scope.status = ''
        $scope.typee = false;
        if (appService.type == "premium")
            $scope.typee = true;
        else
            $scope.typee = false;
        appService.showLoading("جاري تحميل الفواتير");
        if (appService.type == "premium") {
            appService.invoicesOfstore(function (res) {
                $scope.invoices = res.data.data;
                $scope.leng = function () {
                    if ($scope.invoices.length == 0)
                    { return true; }
                    else { return false; }
                }
                appService.hideLoading()

            }, function (err) {
                console.log(err);
            })
        } else {
            appService.getinvoicesOfuser(function (res) {
                $scope.invoices = res.data.data;
                $scope.leng1 = function () {
                    if ($scope.invoices.length == 0)
                    { return true; }
                    else { return false; }
                }
                appService.hideLoading()

            }, function (err) {
                console.log(err);
            })
        }


        $scope.invoiceaction = function (id) {

            if (appService.type == "premium") {
                appService.invoiceid = id;
                $state.go('invoicestatus');
            }
        }
        $scope.status = {};
        $scope.save = function () {
            appService.showLoading("جاري التحميل")
            var obj = {
                id: appService.invoiceid,
                status: $scope.status.data
            }
            appService.invoiceaction(function (res) {
                appService.showAlert(res.message)
                appService.hideLoading();
                $state.go('invoices')
            }, function (err) {
            }, obj)
        }

        $scope.gotouserprofile = function (id, level) {
            appService.profileid = id;
            $state.go('accountprofile');
        }

        $interval(function () {
            var flag = 0;
            if (appService.type == "premium") {
                appService.invoicesOfstore(function (res) {
                    updated = res.data.data;
                    if (updated.length != $scope.invoices.length) {
                        $scope.invoices = updated;
                        flag = 1;
                    }
                    if (flag == 1) {
                        for (var i = 0; i < updated.length; i++) {
                            if (updated[i].seen == 0)
                                seen_counter = seen_counter + 1;
                        }
                        appService.alerts.invoices = seen_counter;
                    }
                    appService.hideLoading()

                }, function (err) {
                    console.log(err);
                })
            }
            else {
                appService.getinvoicesOfuser(function (res) {
                    updated = res.data.data;
                    if (updated.length != $scope.invoices.length) {
                        $scope.invoices = updated;
                        flag = 1;
                    }
                    if (flag == 1) {
                        for (var i = 0; i < updated.length; i++) {
                            if (updated[i].seen == 0)
                                seen_counter = seen_counter + 1;
                        }
                        appService.alerts.invoices = seen_counter;
                    }
                    appService.hideLoading()

                }, function (err) {
                    console.log(err);
                })

            }
        }, 2 * 10000);

        $scope.doRefresh = function () {
            $timeout(function () {
                if (appService.type == "premium") {
                    appService.invoicesOfstore(function (res) {
                        updated = res.data.data;
                        if (updated.length != $scope.invoices.length) {
                            $scope.invoices = updated;
                        }
                        appService.hideLoading()

                    }, function (err) {
                        console.log(err);
                    })
                }
                else {
                    appService.getinvoicesOfuser(function (res) {
                        updated = res.data.data;
                        if (updated.length != $scope.invoices.length) {
                            $scope.invoices = updated;
                        }
                        appService.hideLoading()

                    }, function (err) {
                        console.log(err);
                    })

                }

                $scope.$broadcast('scroll.refreshComplete');

            }, 1000);
        }

    }])