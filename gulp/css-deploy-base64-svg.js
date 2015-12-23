var dirs = require('./config/dirs.json');

module.exports = function (gulp, plugins) {
	return function () {
		gulp.src(dirs.dest.dest_css + '/**/*.css')

			.pipe(plugins.base64({
				baseDir: dirs.dest.base_dir,
				extensions: ['svg'],
				maxImageSize: 20 * 1024, // bytes
				debug: true,
				exclude: ['fonts']
			}))
			.pipe(gulp.dest(dirs.dest.dest_css));
	};
};