//=======================================//
//              Gulp Require             //
//=======================================//
'use strict'

const gulp = require('gulp');
const pug = require('gulp-pug');
const sass = require('gulp-sass');
const autoprefixer = require('gulp-autoprefixer');
const rename = require('gulp-rename');
const browserSync = require('browser-sync').create();

const reload = browserSync.reload;

//=======================================//
//          Compile SASS Files           //
//=======================================//
gulp.task('sass', function(){
  return gulp.src('app/src/sass/main.sass')
    .pipe(sass().on('error', sass.logError))
    .pipe(autoprefixer({
      browsers: ['last 15 versions'],
      cascade: false
    }))
    .pipe(gulp.dest('app/src/css'))
    .pipe(browserSync.stream());
});

//=======================================//
//          Compile Pug Files            //
//=======================================//
gulp.task('pug', function buildHTML(){
  return gulp.src('app/*.pug')
    .pipe(pug())
    .pipe(gulp.dest('./app'));
});

//=======================================//
//      Compile Javascript Files         //
//=======================================//

/*
gulp.task('js', function(){
  gulp.src("./app/src/js/functions.js")
    .pipe(rename("./js/functions.js"))
    .pipe(gulp.dest("app/src/js"));
});
*/

//=======================================//
//             Browser Sync              //
//=======================================//

gulp.task('browser-sync', ['sass', 'pug'], function(){
  browserSync.init({
    server: "app"
  });
});

//=======================================//
//         Watch Compiled Files          //
//=======================================//

gulp.task('watch', function(){
  gulp.watch('app/src/sass/**/*.sass', ['sass']);
  gulp.watch('app/_pugfiles/*.pug', ['pug']);
  gulp.watch('app/*.html').on('change', reload);
});

//=======================================//
//          Run Default Task             //
//=======================================//

gulp.task('default', ['watch','browser-sync']);