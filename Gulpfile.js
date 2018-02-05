const gulp = require('gulp'),//基础库
    cleanCSS = require('gulp-clean-css'),//css压缩
    rename = require("gulp-rename"),//重命名
    uglify = require('gulp-uglify'),//js压缩
    babel = require("gulp-babel"),//转换ES6
    less = require('gulp-less'),//less预编译
    pug = require('gulp-pug'),
    postcss = require('gulp-postcss'),
    autoprefixer = require('autoprefixer');//postcss处理前缀


const cssFiles=['./index.less'],
    jsFiles=['./*.js', '!./assets/**/*.js','!.//*.min.js', '!./Gulpfile.js'],
    htmlFiles=['./*.pug','!./layout.pug', '!./aside.pug', '!./config/**/*.pug', '!./template/**/*.pug'],
    cssPage=['./page/**/*.less'],
    jsPage=['./pages/**/*.js','./pages/**/*.min.js', '!./assets/**/*.js'],
    htmlPage=['./pages/**/*.pug'],
    outUrl='./';
/*CSS处理*/
gulp.task('css', function () {
    return gulp.src(cssFiles)
        .pipe(less())
        .pipe(postcss([ autoprefixer() ]))
        .pipe(gulp.dest(outUrl))
        .pipe(cleanCSS())
        .pipe(rename({suffix: '.min'}))
        .pipe(gulp.dest(outUrl))
});
/*JS处理*/
gulp.task('js', function () {
    return gulp.src(jsFiles)
        .pipe(babel({
            presets: ['es2015']
        }))
        .pipe(uglify())
        .pipe(rename({suffix: '.min'}))
        .pipe(gulp.dest(outUrl))
});
/*HTML处理*/
gulp.task('pug', function () {
    return gulp.src(htmlFiles)
        .pipe(pug({pretty: true}))
        .pipe(gulp.dest(outUrl))
});

/*page文件处理*/
/*CSS处理*/
gulp.task('page-css', function () {
    return gulp.src(cssPage)
        .pipe(less())
        .pipe(postcss([ autoprefixer() ]))
        .pipe(gulp.dest(outUrl))
        .pipe(cleanCSS())
        .pipe(rename({suffix: '.min'}))
        .pipe(gulp.dest(outUrl + 'pages'))
});
/*JS处理*/
gulp.task('page-js', function () {
    return gulp.src(jsPage)
        .pipe(babel({
            presets: ['es2015']
        }))
        .pipe(uglify())
        .pipe(rename({suffix: '.min'}))
        .pipe(gulp.dest(outUrl + 'pages'))
});
gulp.task('page-pug', function () {
    return gulp.src(htmlPage)
        .pipe(pug({pretty: true}))
        .pipe(gulp.dest(outUrl + 'pages'))
});

gulp.task('default',()=>{
    gulp.watch(cssFiles,['css']);
    gulp.watch(jsFiles,['js']);
    gulp.watch(htmlFiles,['pug']);
    gulp.watch(cssPage,['page-css']);
    gulp.watch(jsPage,['page-js']);
    gulp.watch(htmlPage,['page-pug']);
});