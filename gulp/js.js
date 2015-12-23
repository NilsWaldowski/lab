var dirs = require('./config/dirs.json');

module.exports = function (gulp, plugins) {
	return function () {

		var normaljs = gulp.src(dirs.src.src_js + '/**/*.js')

			// concatenate js files
			.pipe(plugins.concat('javascript.js'))

			// write concatenated but not minified files
			.pipe(gulp.dest(dirs.pl_dest.pl_public_js))

			// uglify that shit
			.pipe(plugins.rename({suffix: '.min'}))
			.pipe(plugins.uglify())

			// write the uglified files in the same directories
			.pipe(gulp.dest(dirs.pl_dest.pl_public_js));

		var enhancement = gulp.src(dirs.src.src_js_enhance + '/**/*.js')

			// write original files
			.pipe(gulp.dest(dirs.pl_dest.pl_public_js_enhance))

			// uglify that shit
			.pipe(plugins.rename({suffix: '.min'}))
			//.pipe(plugins.uglify())

			// write the uglified files in the same directories
			.pipe(gulp.dest(dirs.pl_dest.pl_public_js_enhance))
	};
};