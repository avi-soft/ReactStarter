const path = require('path');
const DotenvWebpackPlugin = require('dotenv-webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {
    mode: 'development',
    entry: './app/client/main.js', // Adjust the entry point as needed
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'bundle.js',
        publicPath: '/',
    },
    module: {
        rules: [
            {
                test: /\.jsx?$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env', '@babel/preset-react'],
                        plugins: [
                            ['@babel/plugin-transform-runtime', { corejs: 3 }],
                            ['@babel/plugin-proposal-class-properties', { loose: true }],
                            ['@babel/plugin-proposal-private-methods', { loose: true }],
                            ['@babel/plugin-transform-private-property-in-object', { loose: true }],
                            ['react-css-modules', { filetypes: { '.scss': { syntax: 'postcss-scss' } } }],
                        ],
                    },
                },
            },
            {
                test: /\.scss$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    'css-loader',
                    'sass-loader',
                ],
                include: [path.resolve(__dirname, 'app')],
            },
        ],
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './app/client/main.js', // Adjust as needed
        }),
        new MiniCssExtractPlugin({
            filename: 'styles.css',
        }),
        new CleanWebpackPlugin(),
        new DotenvWebpackPlugin(),
    ],
    devServer: {
        static: {
            directory: path.join(__dirname, 'dist'),
        },
        compress: true,
        port: 9000,
        hot: true,
        devMiddleware: {
            writeToDisk: true,
        },
    },
    resolve: {
        extensions: ['.js', '.jsx'],
        modules: ['node_modules', './app'],
    },
};
