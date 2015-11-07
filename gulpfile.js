var gulp = require('gulp'),
		concat = require('gulp-concat'),
		browserify = require('browserify'),
		plumber = require('gulp-plumber'),
		copy = require('gulp-copy'),
		sourcemaps = require('gulp-sourcemaps'),
		sass = require('gulp-ruby-sass'),
		browserSync = require('browser-sync').create(),
		babelify = require('babelify'),
		source = require('vinyl-source-stream'),
		babel = require("gulp-babel"),
		react = require("gulp-react");
var gutil = require('gulp-util');
var reactify = require('reactify');
var watchify = require('watchify');
var notify = require('gulp-notify');

function handleErrors() {
	var args = Array.prototype.slice.call(arguments);
	notify.onError({
		title: 'Compile Error',
		message: '<%= error.message %>'
	}).apply(this, args);
	this.emit('end'); // Keep gulp from hanging on this task
}

function buildScript(file, watch) {
	var props = {
		entries: ['./app/' + file],
		debug : true,
		transform:  [reactify]
	};
	// watchify() if watch requested, otherwise run browserify() once
	var bundler = watch ? watchify(browserify(props)) : browserify(props);
	function rebundle() {
		var stream = bundler.bundle();
		return stream
		.on('error', handleErrors)
		.pipe(source(file))
		.pipe(gulp.dest('./build/'));
	}
	// listen for an update and run rebundle
	bundler.on('update', function() {
		rebundle();
		gutil.log('Rebundle...');
	});
	// run it once the first time buildScript is called
	return rebundle();
}

gulp.task('scripts', function() {
  return buildScript('main.js', false);
});
gulp.task('default', ['browser-sync', 'watch', 'scripts'], function() {
  return buildScript('main.js', true);
});

// gulp.task('default', ['browser-sync', 'watch']);
gulp.task('watch', function(){
	gulp.watch('styles/*.scss', ['sass']);
	gulp.watch('app/**/*.js').on('change', browserSync.reload);
});
// gulp.task('browserify', function() {
// 	gulp.src('app/main.js')
// 		.pipe(plumber())
// 		.pipe(react())
//     .pipe(babel())
// 		.pipe(browserify({debug: true}))
// 		.pipe(concat('main.js'))
// 		.pipe(gulp.dest('build'));
// });

gulp.task('move', function() {
	gulp.src('views/*')
	  .pipe(gulp.dest('build'));
	gulp.src('assets/*')
	  .pipe(gulp.dest('build/assets'));
});

gulp.task('browser-sync', function() {
    browserSync.init({
        proxy: "localhost:8080"
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
