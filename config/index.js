'use strict'
// Template version: 1.3.1
// see http://vuejs-templates.github.io/webpack for documentation.

const path = require('path')

module.exports = {
  dev: {
    // Paths
    assetsSubDirectory: 'static',
    assetsPublicPath: '/',
    proxyTable: {
      '/api':{
//        target: 'http://10.59.99.48:8284/bms/', // 发送请求的后台接口
//        target: 'http://10.6.20.204:8284/bms/', // 发送请求的后台接口
//        target: 'http://10.6.20.108:8284/bms/', // 轩晨翔
				// target: 'http://192.168.29.172:8284/bms/',
//					target: 'http://192.168.32.19:8284/bms/',
          // target:'http://192.168.35.17:8284/bms',
          // target:'http://192.168.32.113:8284/bms',
          // target:'http://192.168.29.80:8284/bms',
          target:'http://192.168.35.171:8284/bms',
          changeOrigin: true,
          pathRewrite:{ 
            '^/api':'' // 用/api代替后端接口路径
          },
          cookiePathRewrite: {
            '/bms':'/'
          }
        },
      '/approve':{
          target:'http://10.6.20.204:8082/approve/', //工作台消贷
	        changeOrigin:true,
	        pathRewrite:{
	          '^/approve':''
          },
      },
      '/afterloan':{
          target:'http://10.6.20.204:8882/afterloan', //贷后管理
	        changeOrigin:true,
	        pathRewrite:{
	          '^/afterloan':''
	        },
      },
        '/tab':{
          target:'http://10.6.20.204:7002/reportForm', //报表204
          changeOrigin:true,
          pathRewrite:{
            '^/tab':''
          },
      },
	  '/channelaccess':{
          target:'http://10.6.20.204:8383/channelaccess/', //消贷模拟进件
          changeOrigin:true,
          pathRewrite:{
            '^/channelaccess':''
          },
      },
	  '/xdapi':{
          target:'http://10.6.20.204:8181/api', //消贷查询征信报告
          changeOrigin:true,
          pathRewrite:{
            '^/xdapi':''
          },
      },
    },

    // Various Dev Server settings
    host: 'localhost', // can be overwritten by process.env.HOST
    port: 8085, // can be overwritten by process.env.PORT, if port is in use, a free one will be determined
    autoOpenBrowser: false,
    errorOverlay: true,
    notifyOnErrors: true,
    poll: false, // https://webpack.js.org/configuration/dev-server/#devserver-watchoptions-

    
    /**
     * Source Maps
     */

    // https://webpack.js.org/configuration/devtool/#development
    devtool: 'cheap-module-eval-source-map',

    // If you have problems debugging vue-files in devtools,
    // set this to false - it *may* help
    // https://vue-loader.vuejs.org/en/options.html#cachebusting
    cacheBusting: true,

    cssSourceMap: true
  },

  build: {
    // Template for index.html
    index: path.resolve(__dirname, '../dist/ca_bms_html/index.html'),

    // Paths
    assetsRoot: path.resolve(__dirname, '../dist/ca_bms_html'),
    assetsSubDirectory: 'static',
    assetsPublicPath: '/ca_bms_html/',

    /**
     * Source Maps
     */

    productionSourceMap: true,
    // https://webpack.js.org/configuration/devtool/#production
    devtool: '#source-map',

    // Gzip off by default as many popular static hosts such as
    // Surge or Netlify already gzip all static assets for you.
    // Before setting to `true`, make sure to:
    // npm install --save-dev compression-webpack-plugin
    productionGzip: false,
    productionGzipExtensions: ['js', 'css'],

    // Run the build command with an extra argument to
    // View the bundle analyzer report after build finishes:
    // `npm run build --report`
    // Set to `true` or `false` to always turn it on or off
    bundleAnalyzerReport: process.env.npm_config_report
  }
}
