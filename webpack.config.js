const HtmlWebpackPlugin = require('html-webpack-plugin'); // Require  html-webpack-plugin plugin
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CopyWebpackPlugin = require('copy-webpack-plugin');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const sqlwish = require('sqwish');
var UglifyJS = require("uglify-js");
module.exports = {
    entry: [__dirname + "/src/bundle/entry.js"], // webpack entry point. Module to start building dependency graph
    output: {
        path: __dirname + '/dist', // Folder to store generated bundle
        filename: 'js/app.js',  // Name of generated bundle after build
        publicPath: '' // public URL of the output directory when referenced in a browser
    },
    module: {  // where we defined file patterns and their loaders
           rules: [
                {
                    test: /\.js$/,
                    use: 'babel-loader',
                    exclude: [
                        /node_modules/
                    ]
                },
                {
                   test: /\.html/,
                   loader: 'raw-loader'
                },
               {
                   test: /\.s?css$/,
                   use: [//define loader
                       MiniCssExtractPlugin.loader,
                       'css-loader',
                       'sass-loader'
                   ]
               },




            ],

    },
    plugins: [  // Array of plugins to apply to build chunk
        new MiniCssExtractPlugin({
            filename: "style.css"//define fname for compiled css
        }),
        new HtmlWebpackPlugin({
            template: __dirname + "/src/html/index.html",
            inject: 'body',
            minify: true
       }),
        new CopyWebpackPlugin([
            { from: 'src/img/',
                to:"img"
            },
            {from:'src/js/',to:'js',ignore:['entry.js'],

                cache: true},
            {from:'src/css/',to:'css',
             transform(content, path) {
                 return Buffer.from(sqlwish.minify(content.toString()));
              },
            },
            {from:'src/fonts/',to:'fonts'}
        ])



    ],
    devServer: {  // configuration for webpack-dev-server
        contentBase: '/',  //source of static assets
        port: 7700, // port to run dev-server
    }
};
