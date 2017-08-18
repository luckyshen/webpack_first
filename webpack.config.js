var webpack = require('webpack');
var path = require('path');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require("extract-text-webpack-plugin");

var env = process.env.NODE_ENV;  //读取系统变量

var DEV = env != 'production';
var VER = '?v=' + (new Date().getTime()); //静态资源版本号
var bundles = ['main'];

console.log("环境变量: " + env, "是否开发模式：" + DEV);

module.exports = {

	entry : (function(){
		var ret = {};
		bundles.forEach(function(value, index){
			ret[value] = path.resolve('src/simplebootx_mobile/Public/js/qiuqiu/ingameact/brl', value);
		})
		return ret;
	})(),
	
	output : {
		path : DEV ?  './build' : path.resolve('./dist'),
		filename : DEV ? 'simplebootx_mobile/Public/js/qiuqiu/ingameact/brl/[name].js' + VER : 'simplebootx_mobile/Public/js/qiuqiu/ingameact/brl/[name].js' + VER,
		publicPath : DEV ? '' : '../../../'
	},

	module : {
		loaders : [
			{
				test : /\.js$/,
				loader : "babel",
                exclude: /node_modules/
			},
			{
				test : /\.vue$/,
				loader : 'vue',
				include : [
					path.resolve(__dirname, 'src/components')
				]
			},
			{
		        test: /\.scss$/,
		        loader: ExtractTextPlugin.extract('style-loader', 'css-loader!sass-loader')
		    },
			{
	        	test: /\.css$/,
	        	loader: ExtractTextPlugin.extract("style-loader", "css-loader", "sass-loader")
	    	},
			{
		        test: /\.(eot|svg|ttf|woff|woff2)(\?\S*)?$/,
		        loader: 'resource-url-loader',
		        query: {
		        	limit : 1,
		        	invokerRoot : path.resolve(process.cwd(), "src/simplebootx_mobile/Public/css/qiuqiu/ingameact/brl"),
		        	ver: VER,
		        	publicPath : ''
		        }
		    },
			{
			    test: /\.(png|jpe?g|gif|svg)(\?\S*)?$/,
			    loader: 'resource-url-loader',
			    query: {
			        limit : 1024, //单位: bytes ( 小于转换base64 )
			        invokerRoot : path.resolve(process.cwd(), "src/simplebootx_mobile/Public/css/qiuqiu/ingameact/brl"), //css 引入背景同步文件
			        publicPath : '', //css引入背景去除 public path
			        ver: VER //css图片背景引用加入版本号

			    }
			    
			},
			{
				test: /\.txt$/,
				loader: 'resource-url-file',
				query: {}
			},
			// { 
				// test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
				// loader: 'url-loader?name=simplebootx_mobile/Public/images/qiuqiu/ingameact/brl/[name].[ext]'
				// options: {
				//    limit: 10000,
				//    name: 'simplebootx_mobile/Public/images/qiuqiu/ingameact/brl/[name].[ext]'
				// }
			// },
			// {
			// 	test: /\.(htm|html)$/,            //打包html中src的图片地址
			// 	loader: 'html-withimg-loader'
			// }
		]
	},

	vue : {
		loaders : {
			css : ExtractTextPlugin.extract("css"),
			sass : ExtractTextPlugin.extract("css!sass")
		}
	},

	babel: {
	    presets: ['es2015', 'stage-0'],
	    plugins: ['transform-runtime']
	},

	resolve : {
		alias : {
			"vue$": "vue/dist/vue.js",

			// css
			"main": path.resolve("src/simplebootx_mobile/Public/css/qiuqiu/ingameact/brl", "main.scss"),
         "animate": path.resolve("src/simplebootx_mobile/Public/css/qiuqiu/ingameact/brl", "animate.css"),

			// JS common
			fastclick : path.resolve("src/simplebootx_mobile/Public/js/qiuqiu/ingameact/brl/pub", "fastclick"),
			common : path.resolve(__dirname,"src/simplebootx_mobile/Public/js/qiuqiu/ingameact/brl/pub", "common"),
			jquery : path.resolve(__dirname,"src/simplebootx_mobile/Public/js/qiuqiu/ingameact/brl/pub", "jquery-2.1.4.min")

			// Component
		},
		extensions : ["", ".webpack.js", ".web.js", ".js", '.vue', '.css', '.scss', '.less']
	},

	plugins: (function(){
		var plugin = [
			new webpack.optimize.CommonsChunkPlugin('vendors', DEV ? 'simplebootx_mobile/Public/js/qiuqiu/ingameact/brl/vendors.js' : 'simplebootx_mobile/Public/js/qiuqiu/ingameact/brl/vendors.js'),
			new ExtractTextPlugin(!DEV ? "simplebootx_mobile/Public/css/qiuqiu/ingameact/brl/[name].css" + VER : "simplebootx_mobile/Public/css/qiuqiu/ingameact/brl/[name].css" + VER),
			new webpack.HotModuleReplacementPlugin()
		];

		bundles.forEach(function(value, index){
			plugin.push(
				new HtmlWebpackPlugin({
			    	template: './src/simplebootx_mobile/Front/IngameAct/' + value + '.html',
			    	filename: 'simplebootx_mobile/Front/IngameAct/' + value + '.html',
			    	// filename:  value + '.html',
			    	// inject: 'body',
			    	inject: true,
			    	chunks: ['vendors', value],
			    	hash: true
			    	// chunks: [value]
			    })
			);
		})

		!DEV && plugin.push(
			    new webpack.DefinePlugin({
			    	'process.env': {
			        	NODE_ENV: '"production"'
			    	}
			    }),
				new webpack.optimize.UglifyJsPlugin({
			        compress: {
			            warnings: false
			        }
			        // ,mangle: {
			        //     except: ['$super', '$', 'exports', 'require']
			        // }
			    }));
		
		return plugin;
	})(),

	devServer: {
	    contentBase : __dirname+'/src/simplebootx_mobile/Front/IngameAct/',
	    host: process.env.HOST,
	    port : 9099,
	    // historyApiFallback: true,
	    // progress: true,
	    // compress: true,
	    // quiet : false,
	    // noInfo : true,
	    hotOnly: true, //HMR
	}
	// 'cheap-module-eval-source-map' 该模式在一些安卓机上存在作用域解析问题
	// 谨慎使用 webpack 的 eval devtool 模式。如 cheap-module-eval-source-map、eval、cheap-eval-source-map 等 
	// 详细参考：https://webpack.github.io/docs/configuration.html#devtool
	// devtool: 'cheap-module-eval-source-map'
};



