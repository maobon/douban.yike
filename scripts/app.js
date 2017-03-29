/**
 * Created by xinbob on 3/29/17.
 * 业务逻辑 AngularJS-Route 路由
 */

/**
 * 创建模块
 */
var Yike = angular.module('Yike', ['ngRoute']);

/**
 * 配置AngularJS路由
 */
Yike.config(['$routeProvider', function ($routeProvider) {

    $routeProvider.when('/today', {
        // 今日一刻
        templateUrl: './views/today.html',
        // controller: ''

    }).when('/older', {
        // 往期内容
        templateUrl: './views/older.html',
        // controller: ''

    }).when('/author', {
        // 热门作者
        templateUrl: './views/author.html',
        // controller: ''

    }).when('/category', {
        // 栏目浏览
        templateUrl: './views/category.html',
        // controller: ''

    }).when('/settings', {
        // 设置
        templateUrl: './views/settings.html',
        // controller: ''

    }).otherwise({
        // 默认页面
        redirectTo: '/today'
    });

}]);

/**
 * 设置根作用域
 * rootScope中添加toggle方法 该方法所有控制器均可以访问到
 */
Yike.run(['$rootScope', function ($rootScope) {
    // 设置变量用于控制类名
    $rootScope.collapsed = false;

    $rootScope.toggle = function () {
        // 切换类名
        $rootScope.collapsed = !$rootScope.collapsed;
    }
}]);

/**
 * 左侧导航栏 控制器
 */
Yike.controller('NavsCtrl', ['$scope', function ($scope) {

    // 数据与视图分离
    $scope.navs = [
        {text: '今日一刻', icon: 'icon-home', link: '#!/today'},
        {text: '往期内容', icon: 'icon-file-empty', link: '#!/older'},
        {text: '热门作者', icon: 'icon-pencil', link: '#!/author'},
        {text: '栏目浏览', icon: 'icon-menu', link: '#!/category'},
        {text: '设置', icon: 'icon-cog', link: '#!/settings'},
    ];
}]);



