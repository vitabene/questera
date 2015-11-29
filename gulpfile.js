var gulp = require('gulp'),
		sourcemaps = require('gulp-sourcemaps'),
		sass = require('gulp-ruby-sass'),
		browserSync = require('browser-sync').create();

gulp.task('sass', function () {
  return sass('styles/*.scss', { sourcemap: true })
    .on('error', sass.logError)
    .pipe(sourcemaps.write())
    .pipe(sourcemaps.write('maps', {
      includeContent: false,
      sourceRoot: 'source'
    }))
    .pipe(gulp.dest('build/css'))
		.pipe(browserSync.stream({match: '**/*.css'}));
});

gulp.task('default', ['browser-sync', 'watch']);

gulp.task('watch', function(){
	gulp.watch('styles/*.scss', ['sass']);
	// gulp.watch('app/**/*.js').on('change', browserSync.reload);
});

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
