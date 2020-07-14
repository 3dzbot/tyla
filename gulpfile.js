"use strict";

const gulp = require("gulp");
const sass = require('gulp-sass');
const autoprefixer = require('gulp-autoprefixer');
const webpack = require("webpack-stream");
const browsersync = require("browser-sync");
const cleanCSS = require('gulp-clean-css');
const critical = require('critical').stream;
const log = require('fancy-log');

const dist = "./dist/";
// const dist = 'D:\\Documents\\OSPanel\\domains\\test';

gulp.task("copy-html", () => {
    return gulp.src("./src/index.html")
        .pipe(critical({
            inline: true,
            css: [
                'dist/css/style.css'
            ]
        }))
        .pipe(gulp.dest(dist))
        .pipe(browsersync.stream());
});

// Generate & Inline Critical-path CSS
// gulp.task("critical-fun", () => {
//     return gulp.src(dist + '*.html')
//         .pipe(critical({base: dist, inline: true, css: [dist + '/css/style.css']}))
//         .pipe(gulp.dest('dist'));
// });

// gulp.task('critical', ['build'], function (cb) {
//     critical.generate({
//         inline: true,
//         base: dist,
//         src: 'index.html',
//         dest: dist + '/index-critical.html',
//         width: 320,
//         height: 480,
//         minify: true
//     });
// });

// Generate & Inline Critical-path CSS
// gulp.task('critical', () => {
//     return gulp
//         .src('dist/index.html')
//         .pipe(critical({
//             base: 'dist/',
//             inline: true,
//             css: [
//                 'dist/css/style.css'
//             ]
//         }))
//         .on('error', err => {
//             log.error(err.message);
//         })
//         .pipe(gulp.dest('dist/t'));
// });


gulp.task("styles", ()=>{
    return gulp.src("./src/scss/**/*.*")
        .pipe(sass().on('error', sass.logError))
        .pipe(autoprefixer({
            overrideBrowserslist: ['last 2 versions'],
            cascade: false
        }))
        .pipe(gulp.dest('./src/css'))
});

gulp.task("copy-styles", () => {
    return gulp.src("./src/css/**/*.*")
        .pipe(cleanCSS({level: 2}))
        .pipe(gulp.dest(dist + "/css"))
        .on("end", browsersync.reload);
});

gulp.task("build-js", () => {
    return gulp.src("./src/js/main.js")
        .pipe(webpack({
            mode: 'development',
            output: {
                filename: 'main.js'
            },
            watch: false,
            devtool: "source-map",
            module: {
                rules: [
                    {
                        test: /\.m?js$/,
                        exclude: /(node_modules|bower_components)/,
                        use: {
                            loader: 'babel-loader',
                            options: {
                                presets: [['@babel/preset-env', {
                                    debug: true,
                                    corejs: 3,
                                    useBuiltIns: "usage"
                                }]]
                            }
                        }
                    }
                ]
            }
        }))
        .pipe(gulp.dest(dist))
        .on("end", browsersync.reload);
});

gulp.task("copy-assets", () => {
    return gulp.src("./src/assets/**/*.*")
        .pipe(gulp.dest(dist + "/assets"))
        .on("end", browsersync.reload);
});

gulp.task("watch", () => {
    browsersync.init({
        server: dist,
        port: 4000,
        notify: true
    });

    gulp.watch("./src/index.html", gulp.parallel("copy-html"));
    gulp.watch("./src/scss/**/*.*", gulp.parallel("styles"));
    gulp.watch("./src/css/**/*.*", gulp.parallel("copy-styles"));
    gulp.watch("./src/assets/**/*.*", gulp.parallel("copy-assets"));
    gulp.watch("./src/js/**/*.js", gulp.parallel("build-js"));
});

gulp.task("build", gulp.parallel("copy-html", "styles", "copy-styles", "copy-assets", "build-js"));

gulp.task("build-prod-js", () => {
    return gulp.src("./src/js/main.js")
        .pipe(webpack({
            mode: 'production',
            output: {
                filename: 'main.js'
            },
            module: {
                rules: [
                    {
                        test: /\.m?js$/,
                        exclude: /(node_modules|bower_components)/,
                        use: {
                            loader: 'babel-loader',
                            options: {
                                presets: [['@babel/preset-env', {
                                    corejs: 3,
                                    useBuiltIns: "usage"
                                }]]
                            }
                        }
                    }
                ]
            }
        }))
        .pipe(gulp.dest(dist));
});

gulp.task("default", gulp.parallel("build", "watch"));