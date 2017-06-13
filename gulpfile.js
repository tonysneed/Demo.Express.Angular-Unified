var gulp = require('gulp');
var tslint = require('gulp-tslint');
var del = require('del');
var exec = require('child_process').exec;
var nodemon = require('gulp-nodemon');
var runSequence = require('run-sequence');

gulp.task('vet', function () {
    return gulp.src('./src/**/*.ts')
        .pipe(tslint())
        .pipe(tslint.report());
});

gulp.task('clean', function () {
    return del(['./dist/**/*', '!dist']);
});

gulp.task('compile-api', function (done) {
    exec('tsc -p src/api', function (err, stdout, stderr) {
        console.log(stdout);
        done();
    });
});

gulp.task('compile-app', function (done) {
    exec('tsc -p src/app', function (err, stdout, stderr) {
        console.log(stdout);
        done();
    });
});

gulp.task('copy', function () {
    return gulp.src(['./src/**/*.{js,html,css,ico}'])
        .pipe(gulp.dest('./dist'));
});

gulp.task('build', function (done) {
    runSequence('vet', 'clean', 'copy', ['compile-api', 'compile-app'], done);
});

gulp.task('build-no-clean', function (done) {
    runSequence('vet', 'copy', ['compile-api', 'compile-app'], done);
});

gulp.task('watch', ['build-no-clean'], function () {
    return gulp.watch(['src/**/*.{ts,js,html,css,ico}'], ['build-no-clean']);
});

gulp.task('start', ['watch'], function () {
    return nodemon({
        script: 'dist/api/server.js',
        watch: 'dist',
        delay: 5000, // Delay in milliseconds
    })
    .on('restart', function () {
        console.log('Restarted');
    });
});
