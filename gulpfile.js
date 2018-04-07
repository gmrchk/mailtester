var gulp = require('gulp');
var browserSync = require('browser-sync').create();
const SETTINGS = require('./settings');

gulp.task('setWatch', function() {
    global.isWatching = true;
});

gulp.task('watch', ['setWatch'], function(){
    browserSync.init({
        server: {
            baseDir: SETTINGS.path
        }
    });
    browserSync.use(require("bs-html-injector"), {
        files: [SETTINGS.path + "*.html"]
    });
});

gulp.task('default', ['watch']);

