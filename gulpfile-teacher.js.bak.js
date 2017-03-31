var gulp = require('gulp'),

    less = require('gulp-less'),

    cssmin = require('gulp-cssmin'),

    autoprefixer = require('gulp-autoprefixer'),

    rev = require('gulp-rev'),

    rename = require('gulp-rename'),

    imagemin = require('gulp-imagemin'),

    useref = require('gulp-useref'),

    uglify = require('gulp-uglify'),

    gulpif = require('gulp-if'),

    htmlmin = require('gulp-htmlmin'),

    revCollector = require('gulp-rev-collector'),

    base64 = require('gulp-base64');

// 定义任务

// 处理css
gulp.task('css', function () {

    return gulp.src('./public/less/main.less')
        .pipe(less())
        .pipe(autoprefixer())
        .pipe(cssmin())
        .pipe(base64())
        .pipe(rev())
        .pipe(gulp.dest('./release/public/css'))
        .pipe(rev.manifest())
        .pipe(rename('css-manifest.json'))
        .pipe(gulp.dest('./release/rev'));
});

// 处理图片
gulp.task('image', function () {

    return gulp.src(['./public/images/**/*', './uploads/*'], {base: './'})
        .pipe(imagemin())
        .pipe(rev())
        .pipe(gulp.dest('./release'))
        .pipe(rev.manifest())
        .pipe(rename('image-manifest.json'))
        .pipe(gulp.dest('./release/rev'));
});

// 处理js
gulp.task('useref', function () {

    return gulp.src('./index.html')
        .pipe(useref())
        .pipe(gulpif('*.js', uglify()))
        .pipe(gulpif('*.js', rev()))
        .pipe(gulp.dest('./release'))
        .pipe(rev.manifest())
        .pipe(rename('js-manifest.json'))
        .pipe(gulp.dest('./release/rev'));
});

// 处理html
gulp.task('html', function () {

    gulp.src('./views/*.html')
        .pipe(htmlmin({
            collapseWhitespace: true
        }))
        .pipe(gulp.dest('./release/views'));
});

// 其它
gulp.task('other', function () {

    gulp.src(['./api/*.php', './public/fonts/*', './favicon.ico'], {base: './'})
        .pipe(gulp.dest('./release'));
});

// 替换路径
gulp.task('rev', ['css', 'useref', 'image'], function () {

    gulp.src(['./release/rev/*.json', './release/index.html'])
        .pipe(revCollector())
        .pipe(gulp.dest('./release'));
});

// 依赖是异步进行的
gulp.task('release', ['rev', 'other', 'html']);


// function () {
//     return (function () {
//         for(var i=0;i<100000000000000000000; i++) {

//         }
//     })();
// }

// 
gulp.task('a', function () {
    console.log('a任务');
})

gulp.task('b', function () {
    console.log('b任务');
})

gulp.task('c', function () {
    console.log('c任务');
})

gulp.task('d', function () {
    console.log('d任务');
});

// gulp.task('abcd', ['a', 'b', 'c', 'd']);

// 默认执行
// gulp.task('default', ['a', 'b', 'c', 'd']);