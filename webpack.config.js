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
            //title: "�Զ�������ҳ����",
            filename: "index.html",
            template: __dirname + "/src/index-v1.4.html",//new һ����������ʵ������������صĲ���
            chunks: ["index"]
            //hash: true,       // true | false�������true��������а�����script��css���һ��Ψһ��webpack����hashֵ������ڻ�������ǳ����á�
            //inject: true     // | 'head' | 'body' | false  ,ע�����е���Դ���ض��� template ���� templateContent �У��������Ϊ true ���� body�����е� javascript ��Դ�������õ� body Ԫ�صĵײ���'head' �����õ� head Ԫ���С�
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
        new webpack.HotModuleReplacementPlugin(),//�ȼ��ز��
        new webpack.optimize.OccurenceOrderPlugin(),
        new webpack.optimize.UglifyJsPlugin({
            //compress: {warnings: false},
            sourceMap: true,//�����soucemap �����٣���������������soucemap�ļ������ڵ���
            mangle: true
        }),
        new ExtractTextPlugin("css/[name].style.css")
        /*new webpack.ProvidePlugin({
            $:"jquery",
            jQuery:"jquery",
            "window.jQuery":"jquery"
        }),
        new webpack.optimize.CommonsChunkPlugin('vendor', 'vendor.js')*///���ǵ������������ɵ��ļ�
    ],
    resolve: {
        extensions: ['.js', ""],
        alias: {  //ע��ģ�飬�Ժ��õ�ʱ�����ֱ��requier("ģ����")
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