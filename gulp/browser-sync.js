var dirs = require('./config/dirs.json');

module.exports = function (gulp, plugins) {
	return function () {
		plugins.browserSync({
			server: {
				baseDir: dirs.patternlab.public
			},
			files: dirs.patternlab.public,
			ghostMode: true,
			open: "external"
		});
	};
};