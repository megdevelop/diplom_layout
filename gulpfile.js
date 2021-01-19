const gulp = require('gulp');
const concat = require('gulp-concat');
const autoprefixer = require('gulp-autoprefixer');
const cleanCSS = require('gulp-clean-css');
const rename = require('gulp-rename');
const uglify = require('gulp-uglify');
const babel = require('gulp-babel');
const del = require('del');
const browserSync = require('browser-sync').create();
const imageMin = require('gulp-imagemin');
const webp = require('gulp-webp');
const postHtml = require('gulp-posthtml');
const include = require('posthtml-include');
const htmlMin = require('gulp-htmlmin');
const sass = require('gulp-sass');
const svgSprite = require('gulp-svg-sprite');
const cheerio = require('gulp-cheerio');

const typeOfCompression = 4;

function sprite() {
    return gulp.src('./src/img/*.svg') // svg files for sprite
        .pipe(svgSprite({
                mode: {
                    stack: {
                        sprite: "../sprite.svg"  //sprite file name
                    }
                },
            }
        ))
        .pipe(gulp.dest('./build/img/'));
}

function styles() {
    return gulp.src('./src/styles/styles.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(autoprefixer({
        cascade: false,
    }))
    .pipe(gulp.dest('./build/css'))
    .pipe(rename({
        suffix: '.min'
    }))
    .pipe(cleanCSS({
        level: 2
    }))
    .pipe(gulp.dest('./build/css'))
    .pipe(browserSync.stream());
}

function copy() {
    return gulp.src('./src/fonts/**/*.{woff,woff2}')
    .pipe(gulp.dest('./build/fonts'))
}

function images() {
    return gulp.src('./src/img/**/*.{png,jpg}')
    .pipe(imageMin([
      imageMin.optipng({optimizationLevel: typeOfCompression}),
      imageMin.mozjpeg({progressive: true}),
      imageMin.svgo({
        plugins: [
              {removeViewBox: true},
              {cleanupIDs: false}
            ]
        })
    ]))
    .pipe(gulp.dest('./build/img'));
}

function webpImg() {
    return gulp.src('./src/img/*.{png,jpg}')
    .pipe(webp({quality: 95,
                lossless: false}))
    .pipe(gulp.dest('./build/img'));
}

function html() {
    return gulp.src('./src/*.html')
      .pipe(htmlMin({ collapseWhitespace: true }))
      .pipe(gulp.dest('./build'))
      .pipe(browserSync.stream());
  }

function scripts() {
    return gulp.src('./src/js/**/*.js')
    .pipe(babel({
        presets: ['@babel/env']
    }))
    .pipe(concat('scripts.js'))
    .pipe(uglify())
    .pipe(gulp.dest('./build/js'))
    .pipe(browserSync.stream());
}

function watch() {
    browserSync.init({
        server: {
            baseDir: './build'
        }
    });

    gulp.watch('./src/styles/**/*.scss', styles);
    gulp.watch('./src/js/**/*.js', scripts);
    gulp.watch('./src/*.html', html).on('change', browserSync.reload);
}

function clean() {
    return del(['build/*'])
}

gulp.task('svgSprite', sprite);
gulp.task('styles', styles);
gulp.task('fonts', copy);
gulp.task('images', images);
gulp.task('webp', webpImg);
gulp.task('html', html);
gulp.task('scripts', scripts);
gulp.task('watch', watch);

gulp.task('default', gulp.series(clean, gulp.parallel(sprite, styles, copy, images, webpImg, html, scripts), 'watch'))