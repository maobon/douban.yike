/**
 * Created by xinbob on 3/30/17.
 * 自定义指令
 */

angular.module('Directives', [])

    .directive('loadingBar', function () {
        return {
            restrict: 'A',
            template: '<img ng-hide="isLoaded" class="loading-bar" src="./public/images/loadingbar.gif"/>'
        }
    });