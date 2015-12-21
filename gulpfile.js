/**
 * Require gulp/node plugins for this project
 */
var gulp = require('gulp'),

// Gulp
	notify = require('gulp-notify'),
	watch = require('gulp-watch'),

// SASS / CSS
	sass = require('gulp-sass'),
	autoprefixer = require('gulp-autoprefixer'),
	base64 = require('gulp-base64'),
	cmq = require('gulp-merge-media-queries'),

// Files
	concat = require('gulp-concat'),
	rename = require('gulp-rename'),
	uglify = require('gulp-uglify'),
	minifycss = require('gulp-minify-css'),

// Images
	svgmin = require('gulp-svgmin'),
	svg2png = require('gulp-svg2png'),
	imagemin = require('gulp-imagemin'),
	pngquant = require('imagemin-pngquant'),

	del = require('del'),

// shell commands
	shell = require('gulp-shell');

/**
 * Set our source and destination variables
 */
var project = 'Master',

// source files
	src = __dirname + '/FeSource',
	src_icons = src + '/Icons',
	src_img = src + '/Images',
	src_img_edit = src + '/ImagesEditorial',
	src_js = src + '/Javascript',
	src_js_enhance = src + '/JavascriptEnhancement',
	src_scss = src + '/Scss',
	src_fonts = src + '/Fonts',

// destination files TYPO3
	dest = '../httpdocs/Templates/' + project + '/Resources/Public',
	dest_css = dest + '/Css',
	dest_icons = dest + '/Icons',
	dest_img = dest + '/Images',
	dest_img_edit = dest + '/ImagesEditorial',
	dest_js = dest + '/Javascript',
	dest_js_enhance = dest + '/JavascriptEnhancement',
	dest_fonts = dest + '/Fonts',

// destination files Patternlab
	pl_dest = 'public/',
	pl_public = pl_dest + '/Templates/' + project + '/Resources/Public',

	pl_css = '/Css',
	pl_public_css = pl_public + pl_css,

	pl_fonts = '/Fonts',
	pl_public_fonts = pl_public + pl_fonts,

	pl_icons = '/Icons',
	pl_public_icons = pl_public + pl_icons,

	pl_images = '/Images',
	pl_public_images = pl_public + pl_images,

	pl_images_edit = '/ImagesEditorial',
	pl_public_images_edit = pl_public + pl_images_edit,

	pl_js = '/Javascript',
	pl_public_js = pl_public + pl_js,
	pl_js_enhance = '/JavascriptEnhancement',
	pl_public_js_enhance = pl_public + pl_js_enhance;

/**
 * Error handling
 */
function handleError(err) {
	console.log(err.toString());
	this.emit('end');
}

/**
 * Clean up Task: delete everything in the dest folders
 */
gulp.task('clean', function (cb) {
	return del([
		// here we use a globbing pattern to match everything inside the `mobile` folder
		dest + '/**/*',
		pl_public + '/**/*'
	], {force: true});
});

/**
 * Patternlab Shell
 */
gulp.task('pl-generate', shell.task([
	'php core/builder.php -g'
]));

gulp.task('pl-watch', shell.task([
	'php core/builder.php -p -w'
]));

/**
 * CSS Task
 */
gulp.task('css', function () {
	return gulp.src(src_scss + '/**/*.scss')

		// compile scss files
		.pipe(sass({
			style: 'expanded'
		}))
		.on("error", handleError)
		.pipe(autoprefixer('last 2 version', 'safari 5', 'ie 9', 'opera 12.1', 'ios 6', 'android 4'))

		// optimize css files
		.pipe(cmq({log: true}))

		// write the optimized versions
		.pipe(gulp.dest(dest_css))
		.pipe(gulp.dest(pl_public_css))

		// rename file and write again (just in case the .min files are used in development stage already)
		.pipe(rename({suffix: '.min'}))
		.pipe(gulp.dest(dest_css))
		.pipe(gulp.dest(pl_public_css))

		.pipe(notify({
			title: 'CSS task complete my Master!',
			message: 'Have a nice day!'
		}));
});

// build CSS Task
gulp.task('css-build', function () {
	return gulp.src(src_scss + '/**/*.scss')

		// compile scss files
		.pipe(sass({
			style: 'expanded'
		}))
		.on("error", handleError)
		.pipe(autoprefixer('last 2 version', 'safari 5', 'ie 9', 'opera 12.1', 'ios 6', 'android 4'))

		// write compiled but not minified files
		.pipe(gulp.dest(dest_css))
		.pipe(gulp.dest(pl_public_css))

		// optimize css files
		.pipe(cmq({log: true}))

		.pipe(rename({suffix: '.min'}))
		.pipe(minifycss({noAdvanced: true}))

		// write the optimized versions in the same directories
		.pipe(gulp.dest(dest_css))
		.pipe(gulp.dest(pl_public_css))

		.pipe(notify({
			title: 'CSS Build task complete my Master!',
			message: 'Have a nice day!'
		}));
});

gulp.task('css-base64-build', ['css-build'], function () {
	return gulp.src(dest_css + '/**/*.css')
		.pipe(base64({
			extensions: ['svg'],
			maxImageSize: 20 * 1024, // bytes
			debug: true,
			exclude: ['fonts']
		}))
		.pipe(gulp.dest(dest_css));
});

/**
 * JS Task: concatenate and uglify Javascript files
 * ALSO: uglify the Enhancement directory (those files will be included inline in page.ts)
 */
gulp.task('js', function () {

	var normaljs = gulp.src(src_js + '/**/*.js')

		// concatenate js files
		.pipe(concat('javascript.js'))

		// write concatenated but not minified files
		.pipe(gulp.dest(dest_js))
		.pipe(gulp.dest(pl_public_js))

		// rename file and write again (just in case the .min files are used in development stage already)
		.pipe(rename({suffix: '.min'}))
		.pipe(gulp.dest(dest_js))
		.pipe(gulp.dest(pl_public_js))

		.pipe(notify({
			title: 'Javascript task complete my Master!',
			message: 'Have a nice day!'
		}));

	var enhancement = gulp.src(src_js_enhance + '/**/*.js')

		// write original files
		.pipe(gulp.dest(dest_js_enhance))
		.pipe(gulp.dest(pl_public_js_enhance))

		// rename file and write again (just in case the .min files are used in development stage already)
		.pipe(rename({suffix: '.min'}))
		.pipe(gulp.dest(dest_js_enhance))
		.pipe(gulp.dest(pl_public_js_enhance));

});

// JS Build Task
gulp.task('js-build', function () {

	var normaljs = gulp.src(src_js + '/**/*.js')

		// concatenate js files
		.pipe(concat('javascript.js'))

		// write concatenated but not minified files
		.pipe(gulp.dest(dest_js))
		.pipe(gulp.dest(pl_public_js))

		// uglify that shit
		.pipe(rename({suffix: '.min'}))
		.pipe(uglify())

		// write the uglified files in the same directories
		.pipe(gulp.dest(dest_js))
		.pipe(gulp.dest(pl_public_js))

		.pipe(notify({
			title: 'Javascript task complete my Master!',
			message: 'Have a nice day!'
		}));

	var enhancement = gulp.src(src_js_enhance + '/**/*.js')

		// write original files
		.pipe(gulp.dest(dest_js_enhance))
		.pipe(gulp.dest(pl_public_js_enhance))

		// uglify that shit
		.pipe(rename({suffix: '.min'}))
		.pipe(uglify())

		// write the uglified files in the same directories
		.pipe(gulp.dest(dest_js_enhance))
		.pipe(gulp.dest(pl_public_js_enhance));
});

/**
 * Icon Task: Optimize all SVGs and create PNG Fallbacks
 */
gulp.task('svg', function (cb) {
	gulp.src(src_icons + '/**/*.svg')
		.pipe(svgmin())
		.pipe(gulp.dest(dest_icons))
		.pipe(gulp.dest(pl_public_icons));

	cb(console.log('svg task done - png is following'));
});

gulp.task('png', ['svg'], function () {
	gulp.src(src_icons + '/**/*.svg')
		.pipe(svg2png())
		.pipe(gulp.dest(dest_icons))
		.pipe(gulp.dest(pl_public_icons));
});

gulp.task('icons', ['svg', 'png'], function () {
	gulp.src(src_icons)
		.pipe(notify({
			title: 'Icon task complete my Master!',
			message: 'Have a nice day!'
		}));
});

/**
 * Image Task: Optimize all images used by developer
 */
gulp.task('img-dev', function () {
	gulp.src(src_img + '/**/*')

		.pipe(gulp.dest(dest_img))
		.pipe(gulp.dest(pl_public_images));

});

gulp.task('img-dev-build', function () {
	gulp.src(src_img + '/**/*')

		.pipe(imagemin({
			optimizationLevel: 3,
			interlaced: true,
			progressive: true,
			use: [pngquant({
				quality: '80-85',
				speed: 6
			})]
		}))
		.pipe(gulp.dest(dest_img))
		.pipe(gulp.dest(pl_public_images));

});

/**
 * Image Editorial Task: Optimize all editorial images
 */
gulp.task('img-edit', function () {
	gulp.src(src_img_edit + '/**/*')

		.pipe(gulp.dest(dest_img_edit))
		.pipe(gulp.dest(pl_public_images_edit));

});

gulp.task('img-edit-build', function () {
	gulp.src(src_img_edit + '/**/*')

		.pipe(imagemin({
			optimizationLevel: 3,
			interlaced: true,
			progressive: true,
			//svgoPlugins: [{removeViewBox: false}],
			use: [pngquant({
				quality: '80-85',
				speed: 6
			})]
		}))
		.pipe(gulp.dest(dest_img_edit))
		.pipe(gulp.dest(pl_public_images_edit));

});

/**
 * Copy font files to another dir
 */
gulp.task('fonts', function () {
	return gulp.src(src_fonts + '/**/*')
		.pipe(gulp.dest(dest_fonts))
		.pipe(gulp.dest(pl_public_fonts));
});

/**
 * Watch Task:  triggers all tasks needed at given time
 */
gulp.task('watch', function () {

	gulp.watch(src_scss + '/**/*.scss', function () {
		gulp.start('css');
	});

	watch([
		src_js + '/**/*.js',
		src_js_enhance + '/**/*.js'
	], function () {
		gulp.start('js');
	});

	gulp.watch(src_fonts + '/**/*', function () {
		gulp.start('fonts');
	});

});

// INIT TASK FOR FIRST INSTALL - NOT PRODUCTION READY BUT READY FOR AWESOME DEVELOPMENT (no minifying / file optimization)
gulp.task('init', ['icons', 'img-dev', 'img-edit', 'css', 'js', 'fonts']);

// DEVELOPMENT TASK FOR IMAGES (no file optimization)
gulp.task('images', ['icons', 'img-dev', 'img-edit']);

// BUILD TASKS FOR PRODUCTION (separated for CSS/JS and Images)
gulp.task('build-images', ['icons', 'img-dev-build', 'img-edit-build']);
gulp.task('build-css-js', ['css-base64-build', 'js-build', 'fonts']);

// BUILD TASK FOR EVERYTHING AT ONCE
gulp.task('build-all', ['icons', 'img-dev-build', 'img-edit-build', 'css-base64-build', 'js-build', 'fonts']);