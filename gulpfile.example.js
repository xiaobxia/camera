/**
 * Created by xiaobxia on 2017/8/17.
 */
const gulp = require('gulp');
const browserSync = require('browser-sync');
const babel = require("gulp-babel");
const sass = require('gulp-sass');
const del = require('del');

const examplePath = './example/';
const sourcePath = './src/';

gulp.task('clean_old_cameraCss', function () {
  return del(examplePath + 'camera.css');
});

gulp.task('scss_cameraScss', function () {
  return gulp.src(sourcePath + 'camera.scss')
    .pipe(sass())
    .pipe(gulp.dest(examplePath));
});

gulp.task('clean_old_cameraJs', function () {
  return del(examplePath + 'camera.js');
});
//es5化camera.js
gulp.task('es5_cameraJs', function () {
  return gulp.src(sourcePath + 'camera.js')
    .pipe(babel())
    .pipe(gulp.dest(examplePath));
});
//不监听
gulp.task('server', function (cb) {
  browserSync({
    server: {
      baseDir: examplePath
    },
    port: 8080,
    notify: false,
    ghostMode: false,
    open: true
  }, cb);
});

gulp.task('default', gulp.series(
  gulp.parallel('clean_old_cameraJs', 'clean_old_cameraCss'),
  gulp.parallel('es5_cameraJs', 'scss_cameraScss'), 'server'));

