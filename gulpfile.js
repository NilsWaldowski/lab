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
 * Clean up Task: delete everything in the dest folders
 */
// todo: clean plugin doesn't seem to work with the "getTask" pattern/solution
// gulp.task('clean', getTask('clean'));
gulp.task('clean', function (cb) {
	return del([
		// here we use a globbing pattern to match everything inside the `mobile` folder
		dirs.dest.dest + '/**/*',
		dirs.pl_dest.pl_public + '/**/*'
	], {force: true});
});




/**
 * Patternlab Shell
 */
gulp.task('pl-generate', plugins.shell.task([
	'php core/builder.php -g'
]));

gulp.task('pl-watch', plugins.shell.task([
	'php core/builder.php -p -w'
]));




var dirs = JSON.parse(fs.readFileSync('./gulp/config/dirs.json'));
//var config = require('./config.json');




// http://macr.ae/article/splitting-gulpfile-multiple-files.html
function getTask(task, environment) {
	return require('./gulp/' + task)(gulp, plugins, environment);
}




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

/** Base64 Inline SVGs */
// todo: base64 task should only be running when CSS-Tasks is finished
/*
gulp.task('css-deploy-base64-svg', getTask('css-deploy-base64-svg'));
gulp.task('test123', ['css'], function() {
	gulp.start('css-base64-svg');
});
*/



/**
 * Watch
 */
gulp.task('watch', ['css', 'js'], function () {
	gulp.watch(dirs.src.src_scss + '/**/*.scss', ['css']);
	gulp.watch(dirs.src.src_js + '/**/*.js', ['js']);
});




/**
 * Init and Deploy
 */
// INIT TASK FOR FIRST INSTALL - NOT PRODUCTION READY BUT READY FOR AWESOME DEVELOPMENT (no minifying / file optimization)
gulp.task('init', ['icons', 'img-dev', 'img-edit', 'css', 'js', 'fonts'], function() {
	notifier.notify({
		title: 'Init Task Complete My Master!',
		message: 'Have A Nice Day!'
	});
	console.log('[Init Task Complete My Master!] [Have A Nice Day!]');
});

// BUILD TASK FOR EVERYTHING AT ONCE
gulp.task('deploy-stage', ['icons-deploy', 'img-dev-deploy', 'img-edit-deploy', 'css-deploy', 'js-deploy', 'fonts-deploy'], function() {
	notifier.notify({
		title: 'Deployment Task Complete My Master!',
		message: 'Have A Nice Day!'
	});
	console.log('[Deployment Task Complete My Master!] [Have A Nice Day!]');
});

// todo: deploy for live environment
//gulp.task('deploy-live', ['icons', 'img-dev', 'img-edit', 'css', 'js', 'fonts']);