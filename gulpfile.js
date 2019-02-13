/**
 * Created by Molay on 16/7/30.
 */
var gulp = require('gulp');
var gutil = require('gulp-util');
var clean = require('gulp-clean');
var gulpSequence = require('gulp-sequence');
var processHtml = require('gulp-processhtml');
var replace = require('gulp-replace');
var webpack = require('webpack');
var webpackConfig = require('./webpack.config.js');

// 声明目标目录
var dist = './dist';

// 读取配置创建Webpack对象
var webpackCompiler = webpack(Object.create(webpackConfig));

/**
 * 清空目标下所有文件.
 */
gulp.task('clean', function (done) {
    return gulp.src([dist + '/*'])
        .pipe(clean());
});

/**
 * 调用Webpack打包JS文件.
 */
gulp.task('build-js', function (done) {
    webpackCompiler.run(function (err, stats) {
        if (err) throw new gutil.PluginError('webpack:build-js', err);
        gutil.log('[webpack:build-js]', stats.toString({
            colors: true
        }));
        done();
    });
});

/**
 * 替换打包后的JS、HTML文件中的资源路径。
 */
gulp.task('replace-resource-path', function (done) {
    return gulp.src([dist + '/js/*.js'], {base: dist + '/js'})
        .pipe(replace('./../resource/', ''))
        .pipe(replace('../resource/', ''))
        .pipe(gulp.dest(dist + '/js'));
});

/**
 * 拷贝资源。
 */
gulp.task('copy-resource', function (done) {
    return gulp.src(['./resource/**/*'], {base: './resource'})
        .pipe(gulp.dest(dist));
});

/**
 * 拷贝配置。
 */
gulp.task('copy-config', function (done) {
    return gulp.src(['./config.js'])
        .pipe(gulp.dest(dist + '/js'));
});

/**
 * 拷贝html,替换所有的js为打包后的js,并删除CommonJS模拟器.
 */
gulp.task('copy-html', function (done) {
    gulp.src(['./src/*.html'])
        .pipe(processHtml({}))
        .pipe(replace('./../resource/', ''))
        .pipe(replace('../resource/', ''))
        .pipe(gulp.dest(dist))
        .on('end', done);
});

gulp.task('default', gulpSequence(
    'clean',
    ['copy-resource', 'copy-html', 'copy-config'],
    'build-js', 'replace-resource-path'
));