/**
 * Created by xinbob on 3/29/17.
 * 控制器模块
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

    .controller('TodayCtrl', ['$scope', '$http', '$rootScope', '$filter',
        function ($scope, $http, $rootScope, $filter) {
            // 通过根作用域 设置标题
            $rootScope.title = '今日一刻';

            // 使用Angular内置服务 过滤器服务 格式化当前时间
            var date = $filter('date')(new Date(), 'yyyy-MM-dd');

            // reset loading flag
            $rootScope.isLoaded = false;

            // request data
            $http({
                method: 'get',
                url: 'api/today.php'
            }).then(function (res) {
                // 请求数据成功
                $rootScope.isLoaded = true;

                $scope.list = res.data.posts;
                $scope.date = date;
            });
        }])

    .controller('OlderCtrl', ['$scope', '$http', '$rootScope', '$filter',
        function ($scope, $http, $rootScope, $filter) {
            // 通过根作用域 设置标题
            $rootScope.title = '往期内容';

            // 使用Angular内置服务 过滤器服务 格式化当前时间
            var yesterday = new Date() - (1000 * 60 * 60 * 24);
            var date = $filter('date')(yesterday, 'yyyy-MM-dd');

            // reset loading flag
            $rootScope.isLoaded = false;

            // request data
            $http({
                method: 'get',
                url: 'api/older.php',
                params: {
                    day: '-1'
                }
            }).then(function (res) {
                // 请求数据成功
                $rootScope.isLoaded = true;

                $scope.list = res.data.posts;
                $scope.date = date;
            });
        }]);
