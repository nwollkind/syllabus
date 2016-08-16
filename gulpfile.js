var gulp = require("gulp");
var browserify = require("browserify");
var source = require("vinyl-source-stream");
var watchify = require("watchify");
var tsify = require("tsify");
var gutil = require("gulp-util");
var sourcemaps = require("gulp-sourcemaps");
var buffer = require("vinyl-buffer");
var watch = require("gulp-watch");

var resourcesGlob = "resources/*"

var watchedBrowserify = watchify(browserify({
    basedir: ".",
    debug: true,
    entries: ["src/main.ts"],
    cache: {},
    packageCache: {},
})
.plugin(tsify)
.transform("babelify", {presets: ["es2015"], sourcemaps: true}));

gulp.task("copy-resources", function () {
    return gulp.src(resourcesGlob)
        .pipe(gulp.dest("build"));
});

gulp.task("watch-resources", function() {
    gulp.watch(resourcesGlob, ["copy-resources"]);
});

function bundle() {
    return watchedBrowserify
        .bundle()
        .pipe(source("bundle.js"))
        .pipe(buffer())
        .pipe(sourcemaps.init({loadMaps: true}))
        .pipe(sourcemaps.write("./"))
        .pipe(gulp.dest("build"));
}

gulp.task("compile-and-watch", function() {
    return bundle();
});

gulp.task("default", ["copy-resources", "watch-resources", "compile-and-watch"]);
watchedBrowserify.on("update", bundle);
watchedBrowserify.on("log", gutil.log);
