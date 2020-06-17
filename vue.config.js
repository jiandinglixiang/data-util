'use strict'
const path = require('path')
const CompressionWebpackPlugin = require('compression-webpack-plugin')
const ScriptExtHtmlWebpackPlugin = require('script-ext-html-webpack-plugin')

function resolve(dir) {
  return path.join(__dirname, dir)
}

// process.env.NODE_ENV = 'production'

const {
  NODE_ENV,
  VUE_APP_BASE_API,
  VUE_APP_BASE_ASSETS_PATH = '/'
} = process.env

// 配置: https://cli.vuejs.org/config/
module.exports = {
  publicPath: VUE_APP_BASE_ASSETS_PATH,
  outputDir: 'dist',
  assetsDir: '',
  lintOnSave: NODE_ENV === 'development',
  productionSourceMap: false,
  devServer: {
    port: 8080,
    open: true,
    overlay: {
      warnings: false,
      errors: true
    },
    proxy: {
      '/api': {
        target: VUE_APP_BASE_API,
        ws: true,
        changeOrigin: true
      }
    }
  },
  chainWebpack(config) {
    config.plugins.delete('preload')
    config.plugins.delete('prefetch')

    // 排除svg 处理 icons
    config.module
      .rule('svg')
      .exclude.add(resolve('src/icons'))
      .end()

    // 使用插件拼接svg雪碧图
    config.module
      .rule('icons')
      .test(/\.svg$/)
      .include.add(resolve('src/icons'))
      .end()
      .use('svg-sprite-loader')
      .loader('svg-sprite-loader')
      .options({
        symbolId: 'icon-[name]'
      })
      .end()

    // set preserveWhitespace
    config.module
      .rule('vue')
      .use('vue-loader')
      .loader('vue-loader')
      .tap(options => {
        options.compilerOptions.preserveWhitespace = true
        return options
      })
      .end()

    // https://webpack.js.org/configuration/devtool/#development
    config.when(NODE_ENV === 'development', config => {
      config.devtool('cheap-source-map')
    })

    config.when(NODE_ENV !== 'development', config => {
      config
        .plugin('ScriptExtHtmlWebpackPlugin')
        .after('html')
        .use(ScriptExtHtmlWebpackPlugin, [
          {
            inline: /runtime\..*\.js$/
          }
        ])
        .end()

      config.plugin('CompressionWebpackPlugin').use(CompressionWebpackPlugin, [
        {
          test: /\.js$|\.html$|.\css/, // 匹配文件名
          threshold: 10240, // 对超过10k的数据压缩
          deleteOriginalAssets: false // 不删除源文件
        }
      ])

      config.optimization.splitChunks({
        chunks: 'all',
        cacheGroups: {
          libs: {
            name: 'chunk-libs',
            test: /[\\/]node_modules[\\/]/,
            priority: 10,
            chunks: 'initial' // only package third parties that are initially dependent
          },
          commons: {
            name: 'chunk-commons',
            test: resolve('src/components'), // can customize your rules
            minChunks: 3, //  minimum common number
            priority: 5,
            reuseExistingChunk: true
          },
          clipboard: {
            name: 'chunk-clipboard',
            priority: 20,
            test: /[\\/]node_modules[\\/]_?vue-clipboard2(.*)/
          },
          xlsx: {
            name: 'chunk-Xlsx', // split xlsx into a single package
            priority: 20, // the weight needs to be larger than libs and app or it will be packaged into libs or app
            test: /[\\/]node_modules[\\/]_?xlsx(.*)/ // in order to adapt to cnpm
          },
          echarts: {
            name: 'chunk-Echarts', // split echarts into a single package
            priority: 20, // the weight needs to be larger than libs and app or it will be packaged into libs or app
            test: /[\\/]node_modules[\\/]_?echarts(.*)/ // in order to adapt to cnpm
          },
          elementUI: {
            name: 'chunk-elementUI', // split elementUI into a single package
            priority: 30, // the weight needs to be larger than libs and app or it will be packaged into libs or app
            test: /[\\/]node_modules[\\/]_?element-ui(.*)/ // in order to adapt to cnpm
          }
        }
      })

      config.optimization.runtimeChunk('single')

      config.plugin('html').tap(args => {
        if (args && args[0] && args[0].minify) {
          args[0].minify.removeAttributeQuotes = false
        }
        return args
      })
    })
    console.log('vue.config.js Execute successfully')
  }
}
