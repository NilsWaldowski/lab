var dirs = require('./config/dirs.json');

module.exports = function (gulp, plugins) {
	return function () {

		var normaljs = gulp.src(dirs.src.src_js + '/**/*.js')

			// concatenate js files
			.pipe(plugins.concat('javascript.js'))

			// uglify that shit
			.pipe(plugins.rename({suffix: '.min'}))
			.pipe(plugins.uglify())

			// write the uglified files in the same directories
			.pipe(gulp.dest(dirs.dest.dest_js));

		var enhancement = gulp.src(dirs.src.src_js_enhance + '/**/*.js')

			// uglify that shit
			.pipe(plugins.rename({suffix: '.min'}))
			.pipe(plugins.uglify())

			// write the uglified files in the same directories
			.pipe(gulp.dest(dirs.dest.dest_js_enhance))
	};
};