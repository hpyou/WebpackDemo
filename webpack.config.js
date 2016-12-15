var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var OpenBrowserPlugin = require('open-browser-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var path = require('path');

module.exports = {
    //devtool: 'cheap-source-map',
    entry:  {
        "index": __dirname + "/app/pdt-demo/main.js",
        "index-react": __dirname + "/app/react-demo/main.js",
        "index-json": __dirname + "/app/json-demo/main.js"
    },
    output: {
        path: __dirname + "/build",
        //publicPath: "https://ssl.tuniucdn.com/img/20150726/jinrong/pay/pc/",
        filename: "[name].bundle.js"
    },
    module: {
        loaders: [
            { test: /\.json$/, loader: "json" },
            { test: /\.js$/, exclude: /node_modules/, loader: 'babel' },
            //{ test: /\.css$/, loader: ExtractTextPlugin.extract('style', 'css?modules!postcss') },
            { test: /\.css$/, loader: ExtractTextPlugin.extract('style', 'css') },
            { test: /\.(png|jpg)$/, loader: 'url-loader?limit=8192' }
        ]
    },
    /*postcss: [
        require('autoprefixer')
    ],*/
    plugins: [
        new HtmlWebpackPlugin({
            //title: "自动生成网页标题",
            filename: "index.html",
            template: __dirname + "/src/index-v1.4.html",//new 一个这个插件的实例，并传入相关的参数
            chunks: ["index"]
            //hash: true,       // true | false。如果是true，会给所有包含的script和css添加一个唯一的webpack编译hash值。这对于缓存清除非常有用。
            //inject: true     // | 'head' | 'body' | false  ,注入所有的资源到特定的 template 或者 templateContent 中，如果设置为 true 或者 body，所有的 javascript 资源将被放置到 body 元素的底部，'head' 将放置到 head 元素中。
        }),
        new HtmlWebpackPlugin({
            title: "react demo",
            filename: "index-react.html",
            template: __dirname + "/src/index.tmpl.html",
            chunks: ["index-react"]
        }),
        new HtmlWebpackPlugin({
            title: "json demo",
            filename: "index-json.html",
            template: __dirname + "/src/index.tmpl.html",
            chunks: ["index-json"]
        }),
        new OpenBrowserPlugin({
            url: 'http://localhost:8080'
        }),
        new webpack.HotModuleReplacementPlugin(),//热加载插件
        new webpack.optimize.OccurenceOrderPlugin(),
        new webpack.optimize.UglifyJsPlugin({
            //compress: {warnings: false},
            sourceMap: true,//这里的soucemap 不能少，可以在线上生成soucemap文件，便于调试
            mangle: true
        }),
        new ExtractTextPlugin("css/[name].style.css")
        /*new webpack.ProvidePlugin({
            $:"jquery",
            jQuery:"jquery",
            "window.jQuery":"jquery"
        }),
        new webpack.optimize.CommonsChunkPlugin('vendor', 'vendor.js')*///这是第三方库打包生成的文件
    ],
    resolve: {
        extensions: ['.js', ""],
        alias: {  //注册模块，以后用的时候可以直接requier("模块名")
            //jquery: path.join(__dirname,"./src/js/jquery.min.js")
        }
    },
    devServer: {
        colors: true,
        historyApiFallback: true,
        inline: true,
        hot: true
    }
};