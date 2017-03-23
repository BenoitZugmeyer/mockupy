const path = require("path")
const webpack = require("webpack")
const HtmlWebpackPlugin = require("html-webpack-plugin")

function localPath(p) {
    return path.resolve(__dirname, p)
}

function startpagePath(p) {
    return localPath(`../${p}`)
}

function uwaPath(p) {
    return path.resolve(startpagePath("../uwa"), p)
}

const config = {
    context: localPath("src"),
    entry: [ "./main.js" ],
    output: {
        path: localPath("dist"),
        filename: "main.js",
    },
    resolve: {
        alias: {
            App: startpagePath("public/js/App"),
            App_css: startpagePath("public/css/base"),
            UWA: uwaPath("libraries/Uwa/src"),
            UWA_css: uwaPath("libraries/Uwa/assets/css"),
            vendors: uwaPath("libraries/Uwa/lib/vendors"),
        },
    },
    plugins: [
        new HtmlWebpackPlugin({
            hash: true,
            template: localPath("src/index.ejs"),
        }),
    ],
    module: {
        loaders: [
            {
                test: /\.js$/,
                exclude: /\/node_modules\//,
                loader: "babel-loader",
            },
            {
                test: /\.(png|ico)$/,
                loader: "file-loader?name=[path][name].[ext]?[hash]",
            },
        ],
    },
}

module.exports = config
