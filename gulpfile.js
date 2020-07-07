let gulp = require('gulp');
let browserSync = require('browser-sync');
let rename = require("gulp-rename");
let del = require('del');
let htmlmin = require('gulp-htmlmin');
let sass = require('gulp-sass');
let autoprefixer = require('gulp-autoprefixer');
let combineMedia = require('crlab-gulp-combine-media-queries');
// let concat = require('gulp-concat');
// let uglify = require('gulp-uglify-es').default;

gulp.task('clean', function() {
  return del(['build/css', 'build/index.html']);
});

gulp.task('html', function() {
  return gulp.src('src/index.html')
  .pipe(htmlmin({ collapseWhitespace: true }))
  .pipe(gulp.dest('build/'))
  .pipe(browserSync.reload({stream: true}));
});

gulp.task('sass', function() {
  return gulp.src('src/scss/main.scss')
    .pipe(sass({outputStyle: 'compressed'}))
    .pipe(combineMedia())
    .pipe(autoprefixer())
    .pipe(rename({suffix: '.min'}))
    .pipe(gulp.dest('build/css'))
    .pipe(browserSync.reload({stream: true}));
});

// gulp.task('js', function() {
//   return gulp.src(['src/js/fullpages.js', 'src/js/script.js'])
//     .pipe(concat('core.js'))
//     .pipe(uglify())
//     .pipe(rename('main.min.js'))
//     .pipe(gulp.dest('build/js'))
//     .pipe(browserSync.reload({stream: true}));
// });

gulp.task('browser-sync', function() {
  browserSync.init({server: {baseDir: 'build/'}});
});

gulp.task('watch', function() {
  gulp.watch('src/**/*.scss', gulp.parallel('sass'));
  // gulp.watch('src/**/*.js', gulp.parallel('js'));
  gulp.watch('src/index.html', gulp.parallel('html'));
});

gulp.task('default', gulp.parallel(
  // 'js',
  'sass',
  'html',
  'browser-sync',
  'watch'
));
