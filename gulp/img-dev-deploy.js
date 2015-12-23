var dirs = require('./config/dirs.json');

module.exports = function (gulp, plugins) {
	return function () {
		gulp.src(dirs.src.src_img + '/**/*')

			.pipe(plugins.imagemin({
				optimizationLevel: 3,
				interlaced: true,
				progressive: true,
				use: [plugins.pngquant({
					quality: '80-85',
					speed: 6
				})]
			}))
			.pipe(gulp.dest(dirs.dest.dest_img));
	};
};