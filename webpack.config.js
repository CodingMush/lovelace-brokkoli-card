/* eslint-env node */
/* eslint-disable @typescript-eslint/no-require-imports */
const webpack = require('webpack');
const path = require('path');
const compressionPlugin = require('compression-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
    mode: 'production',
    entry: {
        'brokkoli-card': path.resolve(__dirname, 'src', 'brokkoli-card.ts'),
        'brokkoli-list-card': path.resolve(__dirname, 'src', 'brokkoli-list-card.ts'),
        'brokkoli-area-card': path.resolve(__dirname, 'src', 'brokkoli-area-card.ts')
    },
    output: {
        filename: '[name].js',
        path: path.resolve(__dirname),
    },
    optimization: {
        minimize: true
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /(node_modules)/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env'],
                    },
                },
            },
            {
                test: /\.tsx?$/,
                use: 'ts-loader',
                exclude: [/node_modules/, /\.test\.ts$/],
              }
        ],
    },
    plugins: [
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify('production'),
        }),
        new compressionPlugin({
            test: /\.js(\?.*)?$/i,
        }),
        new CopyWebpackPlugin({
            patterns: [
                {
                    from: path.resolve(__dirname, 'translations'),
                    to: path.resolve(__dirname, 'translations'),
                }
            ]
        })
    ],
    resolve: {
        extensions: ['.js', '.jsx', '.ts', '.tsx']
    }
};