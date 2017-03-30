/**
 * Created by xinbob on 3/29/17.
 * 业务逻辑 AngularJS-Route 路由
 */

/**
 * 创建模块
 */
var Yike = angular.module('Yike', ['ngRoute', 'Ctrls', 'Directives']);

/**
 * 配置AngularJS路由
 */
Yike.config(['$routeProvider', function ($routeProvider) {

    $routeProvider.when('/today', {
        // 今日一刻
        templateUrl: './views/today.html',
        controller: 'TodayCtrl'

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

    // 是否已经加载完成(标志位)
    $rootScope.isLoaded = false;

    // 侧边导航栏的收起与展开
    $rootScope.toggle = function () {
        // 切换类名
        $rootScope.collapsed = !$rootScope.collapsed;

        // 导航栏items的动画
        var navs = document.querySelectorAll('.navs dd');
        if ($rootScope.collapsed) {
            //  -> 右 transform:translateX(到0)
            // 初始位置在屏幕左侧向左偏移出自身的宽度 展开侧面导航菜单为平移到进入屏幕
            // 过渡属性 每个间隔0.15s 同时整体动画延迟0.3秒 让侧面边栏先于item平移前展开
            for (var i = 0; i < navs.length; i++) {
                navs[i].style.transform = "translate(0)";
                navs[i].style.transitionDuration = 0.15 * (i + 1) + "s";
                navs[i].style.transitionDelay = "0.3s";
            }
        } else {
            for (var j = navs.length - 1; j >= 0; j--) {
                // 左 <- 向左偏移收起侧面的导航栏
                // 导航选项item 从底部开始遍历 每个间隔0.15s 同时去掉延迟
                navs[j].style.transform = "translate(-100%)";
                navs[j].style.transitionDuration = 0.15 * (navs.length - j) + "s";
                navs[j].style.transitionDelay = "";
            }
        }
    }

}]);







