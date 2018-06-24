var gulp = require('gulp'),
    connect = require('gulp-connect'),
    babel = require('gulp-babel'),
    uglify = require('gulp-uglify');
var browserify = require('browserify');
var babelify = require('babelify');
var source = require('vinyl-source-stream');


function swallowError(err) {
    console.log(err);
    this.emit('end');
}


gulp.task('connect', () => {
    connect.server({
        port: 4000,
        livereload: true
    });
})

gulp.task('js', () => {

    return browserify({
            entries: "./js/app.js",
            debug: true,
            insertGlobals: true
        })
        .bundle()
        .pipe(source('starwars.js'))
        .pipe(gulp.dest("www"))
        .pipe(connect.reload());
})

gulp.task('watch', function() {
    gulp.watch(['./js/*.js'], ['js']);
});
gulp.task('default', ['js', 'connect', 'watch'])