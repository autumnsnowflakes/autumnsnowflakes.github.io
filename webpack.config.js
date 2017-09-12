const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const webpack = require("webpack");
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');


module.exports = {
    entry: {
        vendor: ['./node_modules/mithril/mithril.js', './node_modules/fastclick/lib/fastclick.js'],
        app: ['./src/app.js']
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'app.js',
        publicPath: '/dist/'
    },
    module: {
        rules: [{ // regular css files
                test: /\.css$/,
                loader: ExtractTextPlugin.extract({
                    use: [{
                        loader: 'style-loader',
                    },
                    {
                        loader: 'css-loader',
                        options: {
                            importLoaders: 1,
                        }
                    },
                    {
                        loader: 'postcss-loader'
                    }]
                }),
            }, {
                test: /\.scss$/,
                use: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    //resolve-url-loader may be chained before sass-loader if necessary
                    use: ['css-loader', 'sass-loader']
                }),
                include: path.join(__dirname, "src/style/"),
            },
            {
                test: /\.(png|svg|jpg|gif|jpeg|woff|woff2|eot|ttf|otf)$/,
                use: [
                    'file-loader'
                ]

            },
            {
                test: /\.js$/,

                loader: 'babel-loader',
                exclude: ['/node_modules/', '/dist/']
            }
        ]
    },
    plugins: [
        new ExtractTextPlugin({
            filename: "styles.css",
            allChunks: true
        }),
        new UglifyJSPlugin(),
        new webpack.optimize.CommonsChunkPlugin({
            name: "vendor",
            filename: "vendor.js",
            minChunks: 2
        }),

    ],
    resolve: {
        modules: ["node_modules"]
    },
    devServer: {
        contentBase: path.join(__dirname),
        compress: true,
        port: 7000,
        historyApiFallback: true
    },
    devtool: 'source-map'
}