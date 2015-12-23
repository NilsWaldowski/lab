var dirs = require('./config/dirs.json');

module.exports = function (gulp, plugins) {
	return function () {
		gulp.src(dirs.src.src_icons + '/**/*.svg')

			.pipe(plugins.svg2png())
			.pipe(gulp.dest(dirs.pl_dest.pl_public_icons));
	};
};