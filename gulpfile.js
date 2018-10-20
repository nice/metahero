var gulp = require("gulp");

var sass = require("gulp-sass");
var csso = require("gulp-csso");
var rename = require("gulp-rename");
var browserify = require("browserify");
var source = require("vinyl-source-stream");
var buffer = require("vinyl-buffer");
var uglify = require("gulp-uglify");
var sourcemaps = require("gulp-sourcemaps");

gulp.task("css", function() {
  return gulp.src("./src/index.scss")
    .pipe(sass({includePaths: ['node_modules']}).on("error", sass.logError))
    .pipe(csso())
    .pipe(rename("app.css"))
    .pipe(gulp.dest("./dist/"))
});

gulp.task('js', function() {
  return browserify({entries: "./src/index.js", debug: false}).bundle()
    .pipe( source("app.js") )
    .pipe( buffer() )
    // .pipe( sourcemaps.init({loadMaps: true}) )
    .pipe( uglify() )
    // .pipe( sourcemaps.write() )
    .pipe( gulp.dest("./dist/") )
});

gulp.task("default", ["css", "js"]);