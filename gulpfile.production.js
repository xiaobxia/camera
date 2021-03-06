/**
 * Created by xiaobxia on 2017/8/17.
 */
const gulp = require('gulp');
const babel = require("gulp-babel");
const uglify = require("gulp-uglify");
const rename = require("gulp-rename");
const del = require('del');

const cameraJsPath = './src/camera.js';
const distPath = './dist/';

//清理dist文件夹
gulp.task('clean_dist', function () {
  return del(distPath);
});
//es5化camera.js
gulp.task('es5_cameraJs', function () {
  return gulp.src(cameraJsPath)
    .pipe(babel())
    .pipe(gulp.dest(distPath));
});
//生成压缩版camera.js
gulp.task('compress_cameraJs', function () {
  return gulp.src(cameraJsPath)
    .pipe(babel())
    .pipe(uglify())
    .pipe(rename({suffix: '.min'}))
    .pipe(gulp.dest(distPath));
});
gulp.task('default', gulp.series('clean_dist', gulp.parallel('es5_cameraJs', 'compress_cameraJs')));
