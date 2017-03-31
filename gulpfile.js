/**
 * Created by xinbob on 3/31/17.
 *
 * gulp任务清单文件
 * 最后在cmd中调用该脚本文件 进行项目构建
 */

// 1. 引入Gulp
var gulp = require('gulp'),

    // CSS
    // less -> css -> autoperfix -> mincss ->
    less = require('gulp-less'),
    cssmin = require('gulp-cssmin'),
    autoprefixer = require('gulp-autoprefixer'),
    // 监控内容的变化 生成新的内容 (防止浏览器缓存 资源路径后面会补一段MD5生成的额指纹)
    rev = require('gulp-rev'),
    // 改名字 改的是最后生成的记录的资源原始名称与随机补的后缀后的新名称之间的对应关系 rev.manifest()方法
    rename = require('gulp-rename'),

    // 处理image 压缩图片
    imagemin = require('gulp-imagemin'),

    // 处理js
    useref = require('gulp-useref'), // 合并多个js文件并改名
    uglify = require('gulp-uglify'), // 压缩乱序js
    gulpif = require('gulp-if'), // 因为是直接对html文件进行操作 uglify处理不了css的引用 需要在html文件中写一下注释(注释里面判断)

    // 处理html
    htmlmin = require('gulp-htmlmin'), // 压缩去空格换行之类的

    // final
    // 修改路径 单页面应用SPA 只修改index.html中的路径就可以了
    revCollector = require('gulp-rev-collector');


// 2. 处理css
gulp.task('css', function () {

    return gulp.src('./public/less/main.less') // 写main.less的路径即可
        .pipe(less())
        .pipe(autoprefixer())
        .pipe(cssmin())
        .pipe(rev()) // 将压缩的东西改一个名字 存到目标位置
        .pipe(gulp.dest('./release/public/css'))
        .pipe(rev.manifest())
        .pipe(rename('css-manifest.json'))
        .pipe(gulp.dest('./release/rev'));
});


// 3. 处理image
gulp.task('image', function () {
    // 图片分布在两个路径中 写个数组
    return gulp.src(['./public/images/**/*', './uploads/*'], {base: './'})
    // {base: './'} 这部分不动 后面的路径定义到新的目标路径下
        .pipe(imagemin())
        .pipe(rev()) // 防止缓存
        .pipe(gulp.dest('./release/'))
        .pipe(rev.manifest())
        .pipe(rename('image-manifest.json'))
        .pipe(gulp.dest('./release/rev'));
});


// 4. 处理js
// 合并html文件中的js文件
gulp.task('useref', function () {

    return gulp.src('./index.html')
        .pipe(useref())
        .pipe(gulpif('*.js', uglify())) // 只处理js文件(uglify只可以处理js)
        .pipe(gulpif('*.js', rev()))
        .pipe(gulp.dest('./release/'))
        .pipe(rev.manifest()) // 获取对应关系
        .pipe(rename('js-manifest.json')) // 换个名字
        .pipe(gulp.dest('./release/rev')); // 存到目标文件
});


// 5. 处理html
gulp.task('html', function () {

    gulp.src('./views/*.html')
        .pipe(htmlmin({
            collapseWhitespace: true
        }))
        .pipe(gulp.dest('./release/views'));
});


// 其他 php fonts favicon 一起处理
// 6. 只移动就好了 不用处理
gulp.task('other', function () {

    gulp.src(['./api/*.php', './public/fonts/*', './favicon.ico'], {base: './'})
        .pipe(gulp.dest('./release'));
});


// 7. 替换路径
// index.html 里面的路径是错的 下面开始替换
// 上面的任务添加return 依赖关系检查返回值 只有拿到前一个的返回值才会继续向下进行
// index文件引用资源路径
gulp.task('rev', ['css', 'useref', 'image'], function () {

    // 替换需要依据 就是rev下面的文件
    gulp.src(['./release/rev/*.json', './release/index.html'])
        .pipe(revCollector())
        .pipe(gulp.dest('./release'));
});

// 8. gulp构建入口
// task() 可以写三个参数 中间的数组是依赖 执行a的话
// 首先会把数组中的任务都执行

// gulp 默认定义入口总任务 直接写default cmd中直接写gulp 就被默认执行了
// gulp.task('default',['','','']);

// 定义一个总函数 调用每一步
// 虽然有依赖 但是依赖的这些任务 是异步进行的 总入口仅仅把任务启动了
gulp.task('release', ['rev', 'other', 'html']);

// 此处还有个小bug
// 小Bug修复
// 方法1
// 因为loading icon使用的是Angular的指令 所以没法替换了
// 解决办法可以直接写成hardcode的办法

// 方法2
// loading图片的话 gulp没办法自动替换了 只能手动处理了
// 真正的开发环境中 有的图片会使用base64的编码对图片进行处理


// **** BASE64 ****
// 问题 gallary图片的背景 目前找不到
// 下面修复该问题
// css中的图片 可以是用gulp的插件 把图片进行base64的编码
// 不在使用图片的路径 而是直接将图片编译成Base64编码格式的字符串
// css中直接引这个字符串 这样的话就与路径无关了 浏览器可以处理了
// 图片是可以处理成字符串的 好处是减少网络请求

// *****************
// Gulp 是一个高端的任务 部署网站 一般人还真做不了
// 1. 首先对网站的性能优化要很熟悉
// 2. 对目录结构十分十分熟悉 必须十分清晰 甚至前端代码放在后端框架中的
// 3. 这个工作并不是每天都会做的
// 4. 但是呢 这个必须要懂 网站做完了以后 需要进行这个步骤 最后进行部署




