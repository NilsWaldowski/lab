var dirs = require('./config/dirs.json');

module.exports = function (gulp, plugins) {
	
	return function () {
		gulp.src(dirs.src.src_scss + '/**/*.scss')

			// compile scss files
			.pipe(plugins.sass({
				style: 'expanded'
			}))
			//.on("error", plugins.handleError)
			.pipe(plugins.autoprefixer('last 2 version', 'safari 5', 'ie 9', 'opera 12.1', 'ios 6', 'android 4'))

			// optimize css files
			.pipe(plugins.cmq({log: false}))

			// write the optimized versions
			.pipe(gulp.dest(dirs.dest.dest_css))

			// rename file and minify
			.pipe(plugins.rename({suffix: '.min'}))
			.pipe(plugins.minifycss({noAdvanced: true}))

			.pipe(gulp.dest(dirs.dest.dest_css))
	};
};