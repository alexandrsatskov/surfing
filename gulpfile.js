var gulp         = require('gulp'),
	less         = require('gulp-less'),
	browserSync  = require('browser-sync').create(),
	concat       = require('gulp-concat'),
	uglify       = require('gulp-uglify-es').default,
	autoprefixer = require('gulp-autoprefixer'),
	fileInclude  = require('gulp-file-include');

// Local Server
gulp.task('browser-sync', function() {
	browserSync.init({
		server: {
			baseDir: 'app'
		},
		notify: false,
		// online: false, // Work offline without internet connection
		// tunnel: true, tunnel: 'projectname', // Demonstration page: http://projectname.localtunnel.me
	})
});

gulp.task('code', function() {
	return gulp.src('app/**/*.html')
	.pipe(browserSync.reload({ stream: true }))
});

gulp.task('html', function() {
	return gulp.src('app/html/**/*.html')
	.pipe(fileInclude({
		prefix: '@@'
	}))
	.pipe(gulp.dest('app/'));
});

gulp.task('styles', function() {
	return gulp.src('app/less/**/*.less')
	.pipe(less())
	.pipe(autoprefixer({
		grid: true, // Optional. Enable CSS Grid
		overrideBrowserslist: ['last 10 versions']
	}))
	.pipe(gulp.dest('app/css'))
	.pipe(browserSync.stream());
});

// Scripts & JS Libraries
gulp.task('scripts', function() {
	return gulp.src([
		// 'node_modules/jquery/dist/jquery.min.js', // Optional jQuery plug-in (npm i --save-dev jquery)
		//'app/js/_libs.js', // JS libraries (all in one)
		'app/js/_custom.js', // Custom scripts. Always at the end
		])
	.pipe(concat('scripts.min.js'))
	.pipe(uglify()) // Minify js (opt.)
	.pipe(gulp.dest('app/js'))
	.pipe(browserSync.reload({ stream: true }))
});

gulp.task('watch', function() {
	gulp.watch('app/less/**/*.less', gulp.parallel('styles'));
	gulp.watch('app/js/_custom.js', gulp.parallel('scripts'));
	gulp.watch('app/html/**/*.html', gulp.parallel('html', 'code'));
});

gulp.task('default', gulp.parallel('styles', 'scripts', 'browser-sync', 'watch'));
