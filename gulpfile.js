const gulp = require('gulp')
const postcss = require('gulp-postcss')
const tailwindcss = require('tailwindcss')
const purgecss = require('gulp-purgecss')

const PATHS = {
    css: "./src/styles.css",
    config: "./tailwind.js",
    dist: "./"
};
/* 
Custom extractor for purgeCSS to avoid 
stripping classes with `:` prefixes
*/
class TailwindExtractor {
  static extract(content) {
    return content.match(/[A-z0-9-:\/]+/g) || [];
  }
}

gulp.task('css', () => {
    return gulp
        .src(PATHS.css)
        .pipe(postcss([tailwindcss(PATHS.config),
        require("autoprefixer")]))
        .pipe(purgecss({
            content: [PATHS.dist + "*.html"],
            extractors: [
            {
                extractor: TailwindExtractor,
                extensions: ['css', 'html']
            }]
        }))
        .pipe(gulp.dest(PATHS.dist))
})
