var gulp = require('gulp');
var sourcemaps = require('gulp-sourcemaps');
var source = require('vinyl-source-stream');
var buffer = require('vinyl-buffer');
var browserify = require('browserify');
var watchify = require('watchify');
var babelify = require('babelify');
var connect = require('gulp-connect');
var jscs = require('gulp-jscs');

function compile(watch) {
    var bundler = browserify('./src/index.js', {debug: true})
        .transform(babelify);

    function rebundle() {
        bundler.bundle()
            .on('error', function(err) { console.error(err); this.emit('end'); })
            .pipe(source('build.js'))
            .pipe(buffer())
            .pipe(sourcemaps.init({loadMaps: true}))
            .pipe(sourcemaps.write('./'))
            .pipe(gulp.dest('./public'));
    }

    if (watch) {
        bundler = watchify(bundler);

        bundler.on('update', function() {
            console.log('=> bundling...');
            rebundle();
        });
    }

    rebundle();
}

function watch() {
    return compile(true);
}

gulp.task('jscs', function() {
    return gulp.src('./src/*.js')
        .pipe(jscs())
        .pipe(jscs.reporter());
});

gulp.task('build', ['jscs'], function() { return compile(); });

gulp.task('watch', ['jscs'], function() { return watch(); });

gulp.task('serve', function() {
    connect.server({
        root: './public'
    });
});
