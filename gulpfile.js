const gulp = require('gulp'),
      htmlmin = require('gulp-htmlmin'),
      uglify = require('gulp-uglify'),
      babel = require('gulp-babel'),
      cleanCss = require('gulp-clean-css'),
      connect = require('gulp-connect'),
      del = require('del'),
      sass = require('gulp-sass')

// 把所有要处理文件的源路径和目标路径做一个统一规划
const paths = {
  html: {
    src: 'src/**/*.html',
    dest: 'dist'
  },
  js: {
    src: 'src/js/**/*.js',
    dest: 'dist/js'
  },
  css: {
    src: 'src/css/**/*.scss',
    dest: 'dist/css'
  },
  libs: {
    src: 'src/libs/**/*',
    dest: 'dist/libs'
  },
  img: {
    src: 'src/images/**/*',
    dest: 'dist/images'
  }
}

// 每次启动任务之前先把dist删掉
const delDist = () => del(['dist'])

// 制定html任务：把html文件压缩之后移动到dist目录里
const html = () => {
  // 把src目录下的所有目录的所有html文件取出来，通过管道压缩，再放到目的地dist目录里
  return gulp.src(paths.html.src)
    .pipe(htmlmin({
      removeComments: true,//清除HTML注释
      collapseWhitespace: true,//压缩HTML
      collapseBooleanAttributes: true,//省略布尔属性的值 <input checked="true"/> ==> <input checked />
      removeEmptyAttributes: true,//删除所有空格作属性值 <input id="" /> ==> <input />
      removeScriptTypeAttributes: false,//删除<script>的type="text/javascript"
      removeStyleLinkTypeAttributes: true,//删除<style>和<link>的type="text/css"
      minifyJS: true,//压缩页面JS
      minifyCSS: true//压缩页面CSS 
    })).pipe(gulp.dest('dist'))
    .pipe(connect.reload())
}

// 执行js任务：把js文件取出来，先ES6转ES5，然后压缩，再放到dist里
const js = () => {
  return gulp.src(paths.js.src)
    .pipe(babel({
      presets: ['@babel/env']
      }))
    .pipe(uglify())
    .pipe(gulp.dest(paths.js.dest))
    .pipe(connect.reload())
}

// 制定出素数任务：取出css文件，压缩，放进dist
const css = () => {
  return gulp.src(paths.css.src)
    .pipe(sass())
    .pipe(cleanCss())
    .pipe(gulp.dest(paths.css.dest))
    .pipe(connect.reload())
}

// server任务：启动一个服务器
const server = () => {
  return connect.server({
    root: 'dist',    // 服务器跟目录
    port: 10086,      // 端口号
    livereload: true // 设置支持热更新
  })
}

// 制定libs任务：就是代码复制
const libs = () => gulp.src(paths.libs.src).pipe(gulp.dest(paths.libs.dest))

// img任务：文件复制
const img = () => gulp.src(paths.img.src).pipe(gulp.dest(paths.img.dest))



// 监听文件的变化，进而重启对应任务
// 第一个参数是监听文件路径，第二个参数就是当有文件变化要重启的任务
gulp.watch(paths.html.src, html)
gulp.watch(paths.css.src, css)
gulp.watch(paths.js.src, js)

// 导出默认任务流，先执行删除dist任务，再开启其他任务的异步执行
// series 同步执行任务
// parallel 异步执行
module.exports.default = gulp.series(delDist, gulp.parallel(html, js, css, server, libs, img))
