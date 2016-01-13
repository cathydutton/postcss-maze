var gulp = require('gulp');

var files = ['index.js', 'test/*.js', 'gulpfile.js'];

gulp.task('lint', function () {
    var eslint = require('gulp-eslint');
    return gulp.src(files)
        .pipe(eslint())
        .pipe(eslint.format())
        .pipe(eslint.failAfterError());
});

// CSS TASK
gulp.task('css', function () {
    var concat = require('gulp-concat'),
        postcss = require('gulp-postcss'),
        mqpacker = require('css-mqpacker'),
        postcssMaze = require('./index.js'),
        autoprefixer = require('autoprefixer');

    var processors = [
        postcssMaze({
            media: {
                // mobile: 280,
                // landscape: 480,
                // tablet: 768,
                // desktop: 1020,
                wide: 1020
            },
            settings: {
                // margin: 10
            }
        }),
        mqpacker,
        autoprefixer({
            browsers: ['> 2%', 'IE >= 9', 'iOS >= 7'],
            cascade:  false,
            map:      true,
            remove:   true
        })
    ];

    return gulp.src([
          'demo/layout.css',
          'demo/theme.css'
        ])
        .pipe(postcss(processors))
        .pipe(concat('demo/output.css'))
        .pipe(gulp.dest('.'));
});

gulp.task('test', function () {
    var mocha = require('gulp-mocha');
    return gulp.src('test/*.js', {
        read: false
    })
      .pipe(mocha());
});

gulp.task('default', ['lint', 'test']);

gulp.task('watch', function () {
    gulp.watch(files, ['css', 'lint', 'test']);
});
