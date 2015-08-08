var path = require('path');

module.exports = {

    entry: path.resolve(__dirname, "./lib/index"),

    output: {
        path: path.resolve(__dirname, "./build"),
        filename: "tvs-renderer.js",
        library: 'tsRenderer',
        libraryTarget: "umd"
    },

    module: {
        loaders: [
            {
                exclude: /node_modules/,
                loader: 'babel-loader',
                test: /\.js$/
            }, {
                loader: 'coffee-loader',
                test: /\.coffee$/
            }
        ]
    },

    resolve: {
        extensions: ['', '.js', '.json', '.coffee'],
        root: [
            path.resolve(__dirname, "./lib")
        ]
    }
}
