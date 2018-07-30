var gulp = require('gulp');
var webserver = require('gulp-webserver');
var mainBowerFiles = require('main-bower-files');
var inject = require('gulp-inject');
var del = require('del');
var uglify = require('gulp-uglify');
var cssmin = require('gulp-cssmin');
var rename = require('gulp-rename');

//definición de paths usados
var paths = {
	temp: 'temp',
	tempScr: 'temp/src',
	tempCss: 'temp/styles',
	tempVendor: 'temp/vendor',	
	tempIndex: 'temp/index.html',	
	index: 'app/index.html',
	appSrc: 'app/src/**/*.js',
	appCss: 'app/styles/**/*.css',
	appResources: ['app/**/*', '!app/src/**/*.js', '!app/styles/**/*.css','!app/index.html'],
	bowerSrc: 'bower_components/**/*',
	tempFiles: ['temp/src/**/*.js','temp/styles/**/*.css']
};

gulp.task('default', [  'watch']);

//observador que permite la actualización sin necesidad de correr nueva gulp
gulp.task('watch', [ 'serve'], function () {	
	gulp.watch(paths.index, ['index']);
	gulp.watch(paths.bowerSrc, ['vendors']);
	gulp.watch(paths.appSrc, ['scripts']);
	gulp.watch(paths.appCss, ['css']);	
	gulp.watch(paths.appResources, ['resources']);	
});

gulp.task('serve', ['index', 'vendors', 'scripts',  'css', 'resources'], function () {
	return gulp.src(paths.temp)
		.pipe(webserver({
			open: true
		}));
});

//archivos de carpetas vendros
gulp.task('vendors', function () {
	var tempVendors = gulp.src(mainBowerFiles()).pipe(gulp.dest(paths.tempVendor));

	return gulp.src(paths.tempIndex)
		.pipe(inject(tempVendors, {
			relative: true,
			name: 'vendorInject'
		}))
		.pipe(gulp.dest(paths.temp));
});

//minificación de scripts
gulp.task('scripts', function () {	
	//crear archivos comprimidos de js
	gulp.src(paths.appSrc).pipe(uglify({mangle: false,compress: false}))
		.pipe(gulp.dest(paths.tempScr));
	
	var appFiles = gulp.src(paths.tempFiles, {read: false});
	return gulp.src(paths.tempIndex)
		.pipe(inject(appFiles, {
			relative: true
		}))
		.pipe(gulp.dest(paths.temp));

});


//archivos css
gulp.task('css', function () {	
	gulp.src(paths.appCss)
		.pipe(cssmin())
		.pipe(rename({suffix: '.min'}))
		.pipe(gulp.dest(paths.tempCss));
	var appFiles = gulp.src(paths.tempFiles, {read: false});
	return gulp.src(paths.tempIndex)
		.pipe(inject(appFiles, {
			relative: true
		}))
		.pipe(gulp.dest(paths.temp));
	
});


//archivos recurso
gulp.task('resources', function () {
	//copia recursos 
	return gulp.src(paths.appResources).pipe(gulp.dest(paths.temp));
});


//index 
gulp.task('index', function () {
	//inserta referencias en index.html
	var tempVendors = gulp.src(mainBowerFiles()).pipe(gulp.dest(paths.tempVendor));
	var appFiles = gulp.src(paths.tempFiles, {read: false});
	return gulp.src(paths.index)
		.pipe(gulp.dest(paths.temp))
		.pipe(inject(tempVendors, {
			relative: true,
			name: 'vendorInject'
		}))
		.pipe(inject(appFiles, {
			relative: true
		}))
		.pipe(gulp.dest(paths.temp));
});


//limpiesa de carpeta
gulp.task('clean', function () {
	del.sync([paths.temp]);	
	//crea carpetas 
	return gulp.src('*.*', {read: false})
		.pipe(gulp.dest(paths.tempVendor));
		
});