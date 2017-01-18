var gulp = require('gulp');

var sass = require('gulp-sass');

var livereload = require('gulp-livereload');

var notify = require('gulp-notify');

var autoprefix = require('autoprefixer');

var postcss = require('gulp-postcss');

var lost = require('lost');




//sass

function swallowError (error) {

  // If you want details of the error in the console
  console.log(error.toString())

  this.emit('end')
}

//sass
gulp.task('sass', function() {
	return gulp.src('./src/sass/**/*.sass')
		.pipe(sass({
			errLogToConsole: false,
			onError: function (err) {
				notify().write({
					title: 'Gulp: CSS',
					message: 'Error'
				})
			}
		}))		
		.on('error', swallowError)
		.pipe(postcss([
				lost(),
				autoprefix()
			]))
		.pipe(gulp.dest('./css'))
});

//html
gulp.task('html', function() {
	gulp.src('./**/*.html')
		.pipe(livereload());
});

//javascript
gulp.task('js', function() {
	gulp.src('./js/**/*.js')
		.pipe(livereload());
});

// reload css file
gulp.task('css-reload', function() {
	gulp.src('./css/**/*.css')
		.pipe(livereload());
})


// watch change
gulp.task('watch',['sass', 'js', 'html'], function() {
	gulp.watch('./src/sass/**/*.sass', ['sass']);
	gulp.watch('./**/*.css', ['css-reload']);
	gulp.watch('./**/*.html', ['html']);
	gulp.watch('./js/**/*.js', ['js']);

	livereload.listen({
		host: "localhost",
		reloadPage: "index.html"
	});
});


// exit when press ctrl+c
process.on('SIGINT', function() {
  setTimeout(function() {
    gutil.log(gutil.colors.red('Successfully closed ' + process.pid));
    process.exit(1);
  }, 500);
});