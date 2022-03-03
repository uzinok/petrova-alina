const {
	src,
	dest,
	watch,
	series,
	parallel
} = require('gulp');

// clean
const del = require('del');
// rename
const rename = require('gulp-rename');
// browserSync
const browserSync = require('browser-sync').create();
// error
const plumber = require('gulp-plumber');
const notify = require('gulp-notify');

// styles
const less = require('gulp-less');
// const cleanCSS = require('gulp-clean-css');
const autoprefixer = require('autoprefixer');
// const gcmq = require('gulp-group-css-media-queries');

const postcss = require('gulp-postcss');
const postLess = require('postcss-less');
const postImport = require('postcss-import');
const postUrl = require('postcss-url');
const postMediaMinMax = require('postcss-media-minmax');
const csso = require('postcss-csso')

// scripts
const babel = require('gulp-babel');
const minify = require('gulp-minify');

// html
const htmlmin = require('gulp-htmlmin');
const nunjucks = require('gulp-nunjucks');

const paths = {
	dest: 'dest',
	src: 'src',
	styles: {
		src: 'src/styles/*.less',
		watch: 'src/styles/**/*.less',
		dest: 'dest/styles/'
	},
	scripts: {
		src: 'src/scripts/**/*.js',
		watch: 'src/scripts/**/*.js',
		dest: 'dest/scripts/'
	},
	html: {
		src: 'src/**/*.html',
		watch: 'src/**/*.html',
		dest: 'dest/'
	},
	img: {
		resource: './src/resource/img',
		resourceSvg: './src/resource/svg',
		src: './src/img',
	},
	fonts: {
		src: './src/fonts',
		resource: './src/resource/fonts',
	}
}

const onError = function(err) {
	notify.onError({
		title: "Gulp",
		subtitle: "Failure!",
		message: "Error: <%= error.message %>",
		sound: "Beep"
	})(err);
	this.emit('end');
}

// clean
function clean() {
	return del(paths.dest);
}

// copy
function copy() {
	return src([
			"./src/fonts/*.{woff2,woff}",
			"./src/*.ico",
			"./src/img/**/*.{svg,jpg,jpeg,png,webp,avif}",
			"./src/favicons/*",
			"./src/*.webmanifest"
		], {
			base: paths.src
		})
		.pipe(dest(paths.dest));
}

// styles
function styles() {
	return src(paths.styles.src, {
			sourcemaps: true
		})
		.pipe(plumber({
			errorHandler: notify.onError(function(err) {
				return {
					title: 'Task styles',
					message: "Error: <%= error.message %>",
					sound: true
				}
			})
		}))
		.pipe(postcss([
			postImport(),
			postUrl()
		], {
			syntax: postLess
		}))
		.pipe(plumber({
			errorHandler: onError
		}))
		.pipe(less())
		.pipe(postcss([
			postMediaMinMax(),
			csso(),
			autoprefixer(),
		]))
		.pipe(rename({
			basename: 'main',
			suffix: '.min'
		}))
		.pipe(dest(paths.styles.dest, {
			sourcemaps: "."
		}))
		.pipe(browserSync.stream());
}

// scripts
function scripts() {
	return src(paths.scripts.src)
		.pipe(plumber({
			errorHandler: notify.onError(function(err) {
				return {
					title: 'Task scripts',
					message: "Error: <%= error.message %>",
					sound: true
				}
			})
		}))
		.pipe(babel({
			presets: ['@babel/preset-env']
		}))
		.pipe(minify({
			ext: {
				src: '.js',
				min: '.min.js'
			},
			exclude: ['tasks']
		}))
		.pipe(dest(paths.scripts.dest))
		.pipe(browserSync.stream());
}

// html
function html() {
	return src(paths.html.src)
		.pipe(nunjucks.compile())
		.pipe(htmlmin({
			removeComments: false,
			collapseWhitespace: true
		}))
		.pipe(dest(paths.html.dest))
		.pipe(browserSync.stream());
}

// watch
function watchFiles() {
	watch(paths.styles.watch, styles)
	watch(paths.scripts.watch, scripts)
	watch(paths.html.watch, html)
}

// server
function server() {
	browserSync.init({
		server: {
			baseDir: paths.dest
		}
	});

	watchFiles();
}

// clean
exports.clean = clean;
// copy
exports.copy = copy;
// styles
exports.styles = styles;
// watchFiles
exports.watchFiles = watchFiles;
// scripts
exports.scripts = scripts;
// html
exports.html = html;
// server
exports.server = server;

exports.build = series(clean, copy, parallel(styles, scripts, html))

exports.default = series(clean, copy, parallel(scripts, styles, html), server);

/**
 * Дополнительные задачи
 */
// img
const squoosh = require('gulp-libsquoosh');
const svgSprite = require('gulp-svg-sprite');
const svgmin = require('gulp-svgmin');
// fonts
const ttf2woff2 = require('gulp-ttf2woff2');
const ttf2woff = require('gulp-ttf2woff');

// img
function optiImg() {
	src(paths.img.src + "/**/*.svg", {
			base: paths.src
		})
		.pipe(svgmin())
		.pipe(dest(paths.src));
	return src(paths.img.src + "/**/*.{png,jpg}", {
			base: paths.src
		})
		.pipe(squoosh())
		.pipe(dest(paths.src));
}

function createWebp() {
	return src(paths.img.resource + "/**/*.{jpg,png}")
		.pipe(
			squoosh({
				webp: {}
			})
		)
		.pipe(dest(paths.img.src));
}

function createAvif() {
	return src(paths.img.resource + "/**/*.{jpg,png}")
		.pipe(
			squoosh({
				avif: {}
			})
		)
		.pipe(dest(paths.img.src));
}

function sprite() {
	return src(paths.img.resourceSvg + "/*.svg")
		.pipe(svgSprite({
			mode: {
				stack: {
					sprite: "../sprite.svg"
				}
			},
		}))
		.pipe(dest(paths.img.src));
}

// fonts
function fonts() {
	src([paths.fonts.resource + '/*.ttf'])
		.pipe(ttf2woff())
		.pipe(dest(paths.fonts.src));
	return src([paths.fonts.resource + '/*.ttf'])
		.pipe(ttf2woff2())
		.pipe(dest(paths.fonts.src));
}

// createWebp
exports.createWebp = createWebp;
// createAvif
exports.createAvif = createAvif;
// optiImg
exports.optiImg = optiImg;
// sprite
exports.sprite = sprite;
// fonts
exports.fonts = fonts;
