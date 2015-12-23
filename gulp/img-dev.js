var dirs = require('./config/dirs.json');

module.exports = function (gulp, plugins) {
	return function () {
		gulp.src(dirs.src.src_img + '/**/*')

			.pipe(gulp.dest(dirs.pl_dest.pl_public_images));
	};
};