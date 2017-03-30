/**
 * Created by xinbob on 3/29/17.
 *
 * 控制器模块 (所有控制器定义在该模块下)
 */

angular.module('Ctrls', [])

/**
 * 侧导航栏
 */
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

    /**
     * 今日一刻
     */
    .controller('TodayCtrl', ['$scope', '$http', '$rootScope', '$filter',
        function ($scope, $http, $rootScope, $filter) {

            $rootScope.pos = 0;
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

    /**
     * 往期内容
     */
    .controller('OlderCtrl', ['$scope', '$http', '$rootScope', '$filter',
        function ($scope, $http, $rootScope, $filter) {

            $rootScope.pos = 1;
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
        }])

    /**
     * 热门作者
     */
    .controller('HotAuthorCtrl', ['$scope', '$http', '$rootScope', '$filter',
        function ($scope, $http, $rootScope, $filter) {

            $rootScope.pos = 2;
            // 通过根作用域 设置标题
            $rootScope.title = '热门作者';
            // reset loading flag
            $rootScope.isLoaded = false;

            // request data
            $http({
                method: 'get',
                url: 'api/hot_author.php'

            }).then(function (res) {
                // 请求数据成功
                $rootScope.isLoaded = true;
                $scope.list = res.data.authors;

                // 点击跳转
                $scope.locationHandler = function (url) {
                    location.href = url;
                }
            });
        }])

    /**
     * 栏目浏览
     */
    .controller('CategoryCtrl', ['$scope', '$http', '$rootScope', '$filter',
        function ($scope, $http, $rootScope, $filter) {

            $rootScope.pos = 3;
            // 通过根作用域 设置标题
            $rootScope.title = '栏目浏览';
            // reset loading flag
            $rootScope.isLoaded = false;

            $http({
                method: 'get',
                url: 'api/category.php'

            }).then(function (res) {
                $rootScope.isLoaded = true;
                $scope.list = res.data.columns;
            });

        }])

    /**
     * 栏目浏览
     */
    .controller('SettingsCtrl', ['$scope', '$http', '$rootScope', '$filter',
        function ($scope, $http, $rootScope, $filter) {

            $rootScope.pos = 4;
            // 通过根作用域 设置标题
            $rootScope.title = '设置';
            // reset loading flag
            $rootScope.isLoaded = true;

        }]);

