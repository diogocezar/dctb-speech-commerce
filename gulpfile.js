Gulp = {
	self        : null,
	browserSync : null,
	init: function(){
		Gulp.self        = require('gulp')
		Gulp.browserSync = require('browser-sync').create()
		Gulp.startServer()
	},
	startServer: () => {
		Gulp.self.task('serve', () => {
			console.log('[INICIANDO BrowserSync]');
			Gulp.browserSync.init({
				server: './',
				https: true
			})
			Gulp.self.watch('./css/*.css').on('change', Gulp.browserSync.reload)
			Gulp.self.watch('./js/*.js').on('change', Gulp.browserSync.reload)
			Gulp.self.watch('./*.html').on('change', Gulp.browserSync.reload)
		})
	},
	default: () => {
		Gulp.self.task('default', ['serve']);
	}
}

Gulp.init();