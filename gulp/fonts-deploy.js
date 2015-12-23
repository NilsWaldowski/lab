var dirs = require('./config/dirs.json');

module.exports = function (gulp, plugins) {
	return function () {
		gulp.src(dirs.src.src_fonts + '/**/*')

			.pipe(gulp.dest(dirs.dest.dest_fonts));
	};
};