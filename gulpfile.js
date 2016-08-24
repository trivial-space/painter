const gulp = require('gulp'),
      livereload = require('gulp-livereload'),
      connect = require('gulp-connect'),
      chokidarEvEmitter = require('chokidar-socket-emitter'),
      webpack = require('webpack-stream');


const paths = {
  livereload: ['**/*.html', 'dist/**/*'],
  webpack: ['lib/**/*']
}


gulp.task('server', function() {
  connect.server({
    port: 8081
  })
})


gulp.task('webpack', function() {
  return gulp.src('lib/renderer.js')
    .pipe(webpack(require('./webpack.config.js')))
    .pipe(gulp.dest('dist/'))
})


gulp.task('watch', function() {
  chokidarEvEmitter({port: 5776})
  livereload.listen()
  gulp.watch(paths.webpack, ['webpack'])
  gulp.watch(paths.livereload, function() {
    livereload.reload()
  })
})


gulp.task('default', ['webpack', 'server', 'watch'])
