// Karma configuration
var assign = require('object-assign'),
    config = require('./webpack.config.js'),

    // add custom option to webpack config
    webpack = assign({}, config, {
        cache: true,
        debug: true,
        watch: true,
        devtool: '#inline-source-map'
    });


module.exports = function (config) {
    config.set({

        // base path that will be used to resolve all patterns (eg. files, exclude)
        basePath: '',


        // frameworks to use
        // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
        frameworks: ['mocha', 'chai-sinon'],


        // list of files / patterns to load in the browser
        files: [
            'spec/test-main.js'
        ],


        preprocessors: {
            // add webpack as preprocessor
            'spec/test-main.js': ['webpack', 'sourcemap'] // use this for source maps
        },


        webpack: webpack,


        webpackMiddleware: {
            // webpack-dev-middleware configuration
            // i. e.
            noInfo: true
        },


        browserNoActivityTimeout: 60000, // give webpack more time to build


        // list of files to exclude
        exclude: [],


        // test results reporter to use
        // possible values: 'dots', 'progress'
        // available reporters: https://npmjs.org/browse/keyword/karma-reporter
        reporters: ['mocha'],


        // these need to be included explicitly, for webpack to work
        plugins: [
            require('karma-webpack'),
            require('karma-mocha'),
            require('karma-chai-sinon'),
            require('karma-chrome-launcher'),
            require('karma-phantomjs-launcher'),
            require('karma-firefox-launcher'),
            require('karma-safari-launcher'),
            require('karma-mocha-reporter'),
            require('karma-sourcemap-loader')
        ],


        // web server port
        port: 9876,


        // enable / disable colors in the output (reporters and logs)
        colors: true,


        // level of logging
        // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
        logLevel: config.LOG_INFO,


        // enable / disable watching file and executing tests whenever any file changes
        autoWatch: true,


        // start these browsers
        // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
        browsers: ['Chrome'],


        // Continuous Integration mode
        // if true, Karma captures browsers, runs the tests and exits
        singleRun: false
    });
};
