const gulp = require('gulp')
const nodemon = require('gulp-nodemon')

gulp.task('start', gulp.series(function(done){
    nodemon({
        script: './src/server',
        ext: 'js html'
    });
    done();
}));

gulp.task('default', gulp.series('start'))
