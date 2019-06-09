const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const webpack = require('webpack');

module.exports = {
  mode: 'development',
  devtool: 'cheap-module-eval-source-map',
  // development模式：cheap-module-eval-source-map
  // production模式：cheap-module-source-map
  context: path.resolve(__dirname, 'src'),
  entry: {
    dist: './index.js',
  },
  devServer: {
    overlay: true,
    contentBase: './dist',
    // open: true,
    port: 3000,
    hot: true, // 开启HMR功能
    hotOnly: true, // 即使HMR功能没有生效，也不让浏览器自动重新刷新
    historyApiFallback: true, // 任何url路径访问都会访问根路径html文件，从而使路由生效
    proxy: {
      '/react/api': {
        target: 'https://www.dell-lee.com', // 请求代理到的网址
        secure: false, // 可以对https生效
        pathRewrite: { // 对路径的重写
          'header.json': 'demo.json',
        },
        changeOrigin: true, // 改变请求内origin的选项，使我们的代理支持更多的域名下请求的访问（针对一些反爬虫网站的设置）
        headers: { // 在请求头内自定义设置，模拟请求的配置
          host: 'www.dell-lee.com',
        },
      },
    },
  },
  output: {
    // publicPath: '/',
    filename: '[name].js',
    path: path.resolve(__dirname, 'dist'),
  },
  module: {
    rules: [
      {
        test: /\.(jpg|png|gif)$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              name: '[name].[hash].[ext]', // placeholders占位符 文件名.hash值.文件扩展名
              outputPath: 'assest/', // 打包后文件文件输出目录
              limit: 102400, // 小于102400kb时，打包为base64格式，大于时打包为文件
            },
          },
        ],
      },
      {
        test: /\.scss$/,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              importLoaders: 2, // 配置css-loader 作用于 @import 的资源之前有多少个 loader
              // modules: true, //css模块
            },
          },
          'sass-loader',
          'postcss-loader',
        ],
      },
      {
        test: /\.css$/,
        use: [
          'style-loader',
          'css-loader',
          'postcss-loader',
        ],
      },
      {
        test: /\.(eot|svg|ttf|woff)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              // name: '[name].[ext]', //placeholders占位符 文件名.hash值.文件扩展名
              outputPath: 'assest/', // 打包后文件文件输出目录
            },
          },
        ],
      },
      {
        test: /\.js$/,
        exclude: /node_modules/, // 排除node_modules文件中的js文件
        use: ['babel-loader', {
          loader: 'eslint-loader',
          options: {
            fix: true, // 修复打包时浅显的问题
            cache: true, // 将eslint结果缓存到文件中，减少打包时间
          },
        }],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      // title: 'webpack-study',
      template: './index.html',
    }),
    new CleanWebpackPlugin(),
    new webpack.HotModuleReplacementPlugin(),
  ],
};
