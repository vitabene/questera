var gulp = require('gulp');
var concat = require('gulp-concat');
var browserify = require('gulp-browserify');
var plumber = require('gulp-plumber');
var copy = require('gulp-copy');

gulp.task('browserify', function() {
	gulp.src('src/main.js')
		.pipe(plumber())
		.pipe(browserify({transform: 'reactify', debug: true}))
		.pipe(concat('main.js'))
		.pipe(gulp.dest('build'));
	gulp.src('src/views/*')
	  .pipe(gulp.dest('build'));
});

gulp.task('default', ['watch']);

gulp.task('watch', function(){
	gulp.watch('src/**/*.*', ['browserify']);
});
