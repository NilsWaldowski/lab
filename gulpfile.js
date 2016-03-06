/**
 * Require gulp/node plugins for this project
 */
var notifier = require('node-notifier'),
	gulp = require('gulp'),
	del = require('del'),
	fs = require('fs'),
	plugins = require('gulp-load-plugins')({
		pattern: '*', // load every plugin, not just "gulp-" plugins
		rename: {
			'gulp-merge-media-queries': 'cmq',
			'gulp-minify-css': 'minifycss',
			'imagemin-pngquant': 'pngquant'
		}
	});




/**
 * Load Json files with directories
 */
var dirs = JSON.parse(fs.readFileSync('./gulp/config/dirs.json'));




/**
 * Clean up Task: delete everything in the dest folders
 */
gulp.task('clean', function (cb) {
	return del([
		// here we use a globbing pattern to match everything inside the `mobile` folder
		dirs.dest.dest + '/**/*',
		dirs.pl_dest.pl_public + '/**/*'
	], {force: true});
});




/**
 * require tasks from gulp directory
 * http://macr.ae/article/splitting-gulpfile-multiple-files.html
 */
function getTask(task) {
	return require('./gulp/' + task)(gulp, plugins);
}




/** Browser Sync */
gulp.task('browser-sync', getTask('browser-sync'));

/** Patternlab */
gulp.task('pl-watch', getTask('pl-watch'));
gulp.task('pl-generate', getTask('pl-generate'));

/** CSS */
gulp.task('css', getTask('css'));
gulp.task('css-deploy', getTask('css-deploy'));

/** JS */
gulp.task('js', getTask('js'));
gulp.task('js-deploy', getTask('js-deploy'));

/** Images */
gulp.task('img-dev', getTask('img-dev'));
gulp.task('img-dev-deploy', getTask('img-dev-deploy'));
gulp.task('img-edit', getTask('img-edit'));
gulp.task('img-edit-deploy', getTask('img-edit-deploy'));

/** SVG Icons */
gulp.task('svg', getTask('svg'));
gulp.task('svg-deploy', getTask('svg-deploy'));
gulp.task('png', getTask('png'));
gulp.task('png-deploy', getTask('png-deploy'));
gulp.task('icons', ['svg', 'png']);
gulp.task('icons-deploy', ['svg-deploy', 'png-deploy']);

/** Fonts */
gulp.task('fonts', getTask('fonts'));
gulp.task('fonts-deploy', getTask('fonts-deploy'));




/**
 * Watch
 */
gulp.task('watch', ['css', 'js', 'pl-watch'], function () {
	gulp.watch(dirs.src.src_scss + '/**/*.scss', ['css']);
	gulp.watch(dirs.src.src_js + '/**/*.js', ['js']);
	gulp.watch(dirs.src.src_js_enhance + '/**/*.js', ['js']);
	gulp.watch(dirs.patternlab.files, ['pl-watch']);
});




/**
 * Init (no minifying / file optimization) - Commit to Patternlab Repository
 */
gulp.task('init', ['clean'], function () {

	gulp.start(
		'icons',
		'img-dev',
		'img-edit',
		'css',
		'js',
		'fonts'
	);

	notifier.notify({
		title: 'Init Task Complete My Master!',
		message: 'Have A Nice Day!'
	});
	console.log(
		'[Init Task Complete My Master!] ' +
		'[Have A Nice Day!]'
	);
});



/**
 * Deploy production ready for CMS Integration - Commit to CMS Repository
 */
gulp.task('deploy', ['clean'], function () {

	gulp.start(
		'icons-deploy',
		'img-dev-deploy',
		'img-edit-deploy',
		'css-deploy',
		'js-deploy',
		'fonts-deploy'
	);

	notifier.notify({
		title: 'Deployment Task Complete My Master!',
		message: 'Have A Nice Day!'
	});

	console.log(
		'[Deploy Task Complete My Master!] ' +
		'[Have A Nice Day!]'
	);
});