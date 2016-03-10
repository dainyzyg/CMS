/**
 * Created by ad on 2016/2/22.
 */
var path = require('path')
var getFileList = require('./src/lib/utils/getFileList')
var webpack = require('webpack')
var node_modules = path.resolve(__dirname, 'node_modules')
var entryPath = path.resolve(__dirname, './src/pages')
var entry = {}
console.log(entryPath)
var fileList = getFileList(entryPath)
fileList.forEach((item, index, array)=> {
    entry[item.relative] = item.path
})

var deps = [
    {name: 'react', path: 'react/dist/react.js'},
    //{name: 'react-dom', path: 'react-dom/dist/react-dom.js'}
]

var config = {
    entry: entry,
    resolve: {
        alias: {
            "react-dom": path.resolve(node_modules, 'react-dom/dist/react-dom.js')
        }
    },
    output: {
        //chunkFilename: "[chunkhash].bundle.js",
        path: path.resolve(__dirname, 'public/javascripts'),
        filename: '[chunkhash].[name].js'
    },
    module: {
        loaders: [
            {
                test: /\.jsx?$/,
                exclude: /(node_modules|bower_components)/,
                loader: 'babel',
                query: {
                    presets: ['react', 'es2015']
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
        //new webpack.optimize.CommonsChunkPlugin(/* chunkName= */"react", /* filename= */"[name].js")
    ]
}
deps.forEach(function (dep) {
    var depPath = path.resolve(node_modules, dep.path)
    config.resolve.alias[dep.name] = depPath
    config.module.noParse.push(depPath)
})
console.log(config)
module.exports = config;
