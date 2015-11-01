var gulp = require('gulp'),
		concat = require('gulp-concat'),
		browserify = require('gulp-browserify'),
		plumber = require('gulp-plumber'),
		copy = require('gulp-copy'),
		sourcemaps = require('gulp-sourcemaps'),
		sass = require('gulp-sass'),
		browserSync = require('browser-sync').create();

gulp.task('browserify', function() {
	gulp.src('app/main.js')
		.pipe(plumber())
		.pipe(browserify({transform: 'reactify', debug: true}))
		.pipe(concat('main.js'))
		.pipe(gulp.dest('build'));
	gulp.src('views/*')
	  .pipe(gulp.dest('build'));
	gulp.src('assets/*')
	  .pipe(gulp.dest('build/assets'));
});

gulp.task('browser-sync', function() {
    browserSync.init({
        proxy: "dev:4000"
    });
});

gulp.task('sass', function () {
  gulp.src('styles/*.scss')
		.pipe(sourcemaps.init())
    .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
		.pipe(sourcemaps.write())
    .pipe(gulp.dest('build/css'))
		.pipe(browserSync.stream());
});

gulp.task('default', ['browser-sync', 'watch']);
gulp.task('watch', function(){
	gulp.watch('app/**/*.*', ['browserify']);
	gulp.watch('styles/*.scss', ['sass']);
	gulp.watch('app/**/*.js').on('change', browserSync.reload);
});
