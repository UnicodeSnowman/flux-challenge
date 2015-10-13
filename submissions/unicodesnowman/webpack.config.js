module.exports = {
    entry: './app.js',
    output: {
        filename: 'dist/bundle.js'
    },
    module: {
        loaders: [
            {
                test: /\.css$/,
                loader: 'style-loader!css-loader'
            },
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: 'babel'
            }
        ]
    },
    devtool: 'sourcemap'
}
