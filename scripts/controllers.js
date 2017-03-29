/**
 * Created by xinbob on 3/29/17.
 */

angular.module('Ctrls', [])

    .controller('NavsCtrl', ['$scope', function ($scope) {
        // 数据与视图分离
        $scope.navs = [
            {text: '今日一刻', icon: 'icon-home', link: '#!/today'},
            {text: '往期内容', icon: 'icon-file-empty', link: '#!/older'},
            {text: '热门作者', icon: 'icon-pencil', link: '#!/author'},
            {text: '栏目浏览', icon: 'icon-menu', link: '#!/category'},
            {text: '设置', icon: 'icon-cog', link: '#!/settings'},
        ];
    }])

    .controller('TodayCtrl', ['$scope', '$http', function ($scope, $http) {

        $http({
            method: 'get',
            url: 'api/today.php'

        }).then(function (res) {
            console.log(res.data);
        });


    }]);