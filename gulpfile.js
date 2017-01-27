const gulp    = require('gulp');
const webpack = require('gulp-webpack');
const merge   = require('merge-stream');
const del     = require('del');
const zip     = require('gulp-zip');

const config = require('./gulp-config.json');

const copyToJoomla = function() {
	console.log('copy to ' + config.joomlaDir);

	const copyStreams = [
		gulp.src(['public/**', '!public/cars.xml', '!public/.gitignore'])
			.pipe(gulp.dest(config.joomlaDir)),
		gulp.src(['public/cars.xml'])
			.pipe(gulp.dest(config.joomlaDir + '/administrator/components/com_cars'))
	];

	return merge(copyStreams);
};

// Check if config has defaultTasks defined
const defaultTasks = config.hasOwnProperty('defaultTasks') ? config.defaultTasks : ['webpack'];
gulp.task('default', defaultTasks);

gulp.task('release', ['webpack'], function(){
	const fileName = 'com_cars.zip';
	const releaseDir = config.hasOwnProperty('releaseDir') ? config.releaseDir : './release';

	gulp.src(['public/**'])
		.pipe(zip(fileName))
		.pipe(gulp.dest(releaseDir));
});

gulp.task('webpack', function() {
	return gulp.src('')
		.pipe(webpack( require('./webpack.config.js') ))
		.pipe(gulp.dest('public/components/com_cars/assets/build'));
});

// Watch
gulp.task('watch', ['watch:react', 'watch:component']);

gulp.task('watch:component', function() {
	gulp.watch(['public/**', '!public/components/com_cars/assets/**'],
		['simplecopy']);
});

gulp.task('watch:react', function() {
	gulp.watch(['public/components/com_cars/assets/**', '!public/components/com_cars/assets/build', '!public/components/com_cars/assets/build/**'],
		['copy']);
});

gulp.task('copy', ['webpack', 'clean'], copyToJoomla);
gulp.task('simplecopy', ['clean'], copyToJoomla);

gulp.task('clean', function(){
	return del([config.joomlaDir + '/administrator/components/com_cars', config.joomlaDir + '/components/com_cars'], {force : true});
});
