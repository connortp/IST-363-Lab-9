var gulp = require('gulp'),
    sass = require('gulp-sass'),
    rename = require('gulp-rename');

gulp.task('sass', function(){
    return gulp.src('./instructions.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest('./'));
})