// Require plugins
var gulp = require('gulp');
var sass = require('gulp-sass');
var browserSync = require('browser-sync').create();
var useref = require('gulp-useref');
var uglify = require('gulp-uglify');
var gulpIf = require('gulp-if');
var cssnano = require('gulp-cssnano');
var imagemin = require('gulp-imagemin');
var cache = require('gulp-cache');
const { series } = require('gulp');
var concat = require('gulp-concat');
var wring = require('csswring');
var autoprifixer = require('autoprefixer');
var postcss = require('gulp-postcss');



 


/*gulp.task('prefix', () =>
    gulp.src('app/css/style.css')
        .pipe(autoprefixer({
            browsers: ['last 99 versions'],
            cascade: false
    }))
    .pipe(gulp.dest('dist/css'))
);*/

// Live Server
gulp.task('browserSync', function() {
    browserSync.init({
      server: {
        baseDir: 'app'
      },
    })
  })

// Compilation SASS 
gulp.task('sass', function() {
    return gulp.src('app/sass/**/*.scss') // Gets all files ending with .scss in app/scss
      .pipe(sass())
      .pipe(gulp.dest('app/css'))
      .pipe(browserSync.reload({
        stream: true
      }))
  });

// Watch
gulp.task('watch', function(){
    gulp.watch('app/sass/**/*.scss', gulp.series(['sass']));
})

gulp.task('useref', function(){

  var process =[
    autoprifixer({
      browsers :'last 10 version'
    }),

    wring
  ]
    return gulp.src('app/*.html')
      .pipe(useref())
      // Minifies only if it's a JavaScript file
      .pipe(gulpIf('*.js', uglify()))
      // Minifies only if it's a CSS file
      .pipe(gulpIf('*.css', postcss(process)))
      .pipe(gulp.dest('./dist'))
      
});

gulp.task('images', function(){
  return gulp.src('app/images/**/*.+(png|jpg|jpeg|gif|svg)')
  // Caching images that ran through imagemin
  .pipe(cache(imagemin({
      interlaced: true
    })))
  .pipe(gulp.dest('dist/images'))
});
//concat js
gulp.task('scripts', function() {
  return gulp.src('./js/*.js')
    .pipe(concat('all.js'))
    .pipe(gulp.dest('./dist/'));
});

//concat css
gulp.task('css', function() {
  return gulp.src('./css/*.css')
    .pipe(concat('all.css'))
    .pipe(gulp.dest('./dist/'));
});
//Build Prod
exports.build = series('sass', 'images', 'useref');