/**
 * Created by ad on 2016/2/22.
 */
var path = require('path')
var getFileList = require('./src/lib/utils/getFileList')
var deleteFilesByDir = require('./src/lib/utils/deleteFilesByDir')
var webpack = require('webpack')
var node_modules = path.resolve(__dirname, 'node_modules')
var entryPath = path.resolve(__dirname, './src/pages')
var entry = {
    //reactchunk: ['react', 'react-dom']
}
deleteFilesByDir(path.resolve(__dirname, 'public/dist'))
var fileList = getFileList(entryPath)
fileList.forEach((item, index, array) => {
    entry[item.relative] = item.path
})

var deps = [
    { name: 'react', path: 'react/dist/react.min.js' },
    //{name: 'react-dom', path: 'react-dom/dist/react-dom.js'}
]

var config = {
    //babel: {
    //    cacheDirectory: true,
    //    presets: ['es2015', 'react', 'stage-0'],
    //    plugins: ['add-module-exports',
    //        'typecheck',
    //        'transform-decorators-legacy',
    //        'antd']
    //},
    entry: entry,
    resolve: {
        extensions: ['', '.js', '.jsx']
    },
    output: {
        //chunkFilename: "[chunkhash].bundle.js",
        path: path.resolve(__dirname, 'public/dist'),
        filename: '[chunkhash].[name].js',
        //chunkFilename: "[id].[hash].bundle.js"
    },
    node: {
        child_process: 'empty',
        cluster: 'empty',
        dgram: 'empty',
        dns: 'empty',
        fs: 'empty',
        module: 'empty',
        net: 'empty',
        readline: 'empty',
        repl: 'empty',
        tls: 'empty'
    },
    module: {
        loaders: [{
            test: /\.jsx?$/,
            exclude: /node_modules/,
            loader: 'babel',
            query: {
                cacheDirectory: true,
                presets: ['es2015', 'react',],
                plugins: ['add-module-exports',
                    'typecheck',
                    'transform-decorators-legacy',
                    'antd']
            }
        },
            {
                test: /\.css$/,
                loader: 'style!css'
            }
        ],
        noParse: []
    },
    plugins: [
        function() {
            this.plugin("done", function(stats) {
                var filesMapping = {}
                stats.toJson().assets.forEach((item, index, array) => {
                    filesMapping[item.chunkNames[0]] = item.name
                })
                require("fs").writeFileSync(
                    path.join(__dirname, "public/dist", "filesMapping.json"),
                    JSON.stringify(filesMapping))
            }
            )
        },
        new webpack.optimize.OccurenceOrderPlugin(),
        new webpack.optimize.CommonsChunkPlugin('common', /* filename= */"[chunkhash].common.js"),
        //new webpack.optimize.UglifyJsPlugin({
        //    output: {
        //        ascii_only: true
        //    },
        //    compress: {
        //        warnings: false
        //    }
        //}),
        new webpack.DefinePlugin({
            "process.env": {
                NODE_ENV: JSON.stringify("development")
            }
        }),
        new webpack.optimize.DedupePlugin(),
        new webpack.NoErrorsPlugin(),
    ],
    devtool: 'cheap-module-eval-source-map',
    watch: true
    //UglifyJsPluginConfig: {
    //    output: {
    //        ascii_only: true
    //    },
    //    compress: {
    //        warnings: false
    //    }
    //}
}
deps.forEach(function(dep) {
    var depPath = path.resolve(node_modules, dep.path)
    //config.resolve.alias[dep.name] = depPath
    //config.module.noParse.push(depPath)
})
module.exports = config;

