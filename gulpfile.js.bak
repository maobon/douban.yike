/**
 * Created by xinbob on 3/31/17.
 *
 * gulp任务清单文件
 * 最后在cmd中调用该脚本文件 进行项目构建
 */

// 引入Gulp
var gulp = require('gulp');

// 引入Gulp的插件 处理具体的问题
var less = require('gulp-less');
var cssmin = require('gulp-cssmin');
var autoprefixer = require('gulp-autoprefixer');
var imagemin = require('gulp-imagemin');

/**
 * 设置gulp的任务
 *
 * gulp.src('要操作文件的路径')
 * pipe(管道中要做的方法调用) 管道方法
 * pipe().pipe().pipe() 支持链式调用
 * .pipe(gulp.dest('生成文件目标路径')) 设置最后处理完成后文件的路径地址
 */
gulp.task('less2css', function () {

    gulp.src('./public/less/*.less')
        .pipe(less())
        .pipe(autoprefixer())
        .pipe(cssmin())
        .pipe(gulp.dest('./release/public/css'));

});

/**
 * 处理图片的任务
 */
gulp.task('image', function () {
    gulp.src(['./public/images/**/*', './uploads/*'], {base: './'})
        .pipe(imagemin())
        .pipe(gulp.dest('./release/'));
})







