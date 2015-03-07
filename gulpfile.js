var gulp = require('gulp'),
    connect = require('gulp-connect'),
    open = require('gulp-open');

gulp.task('connect', function() {
    connect.server({
        root: './'
    });
});

gulp.task('open', function(){
    var options = {
        url: 'http://localhost:8080/index.html'
    };
    gulp.src('./index.html')
    .pipe(open('', options));
});

gulp.task('default', ['connect', 'open']);