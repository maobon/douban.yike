/**
 * Created by xinbob on 3/31/17.
 */

var gulp = require('gulp');

var less = require('gulp-less');
var cssmin = require('gulp-cssmin');

gulp.task('less2css', function () {
    gulp.src('./public/less/*.less')
        .pipe(less())
        .pipe(cssmin())
        .pipe(gulp.dest('./release/public/css'));
});





