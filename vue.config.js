const path = require('path')
const glob = require('glob')
//定义resolve方法，把相对路径转换成绝对路径
const resolve = (dir) => path.join(__dirname, dir)
const CompressionWebpackPlugin = require('compression-webpack-plugin') //开启压缩
const UglifyJsPlugin = require('uglifyjs-webpack-plugin') // 去掉注释
const isProduction = process.env.NODE_ENV === 'production'

//动态查找所有入口
function getEntry(globPath) {
  let entries = {}
  glob.sync(globPath).forEach(function(entry) {
    const tmp = entry.split('/').splice(-3)
    entries[tmp[1]] = {
      entry: `src/${tmp[0]}/${tmp[1]}/main.js`,
      template: `src/${tmp[0]}/${tmp[1]}/${tmp[1]}.html`,
      filename: `${tmp[1]}.html`,
      title: 'Index Page',
      chunks: ['vendors', 'common', tmp[1]],
    }
  })
  return entries
}

let page = {}
const pages = getEntry('./src/views/**/main.js')
let projectName = process.argv[3] // 获取执行哪个文件
if (process.env.NODE_ENV === 'development') {
  page = pages
} else {
  page[projectName] = pages[projectName]
}

module.exports = {
  publicPath: process.env.NODE_ENV === 'development' ? '/' : './',
  outputDir: 'dist-' + projectName,
  filenameHashing: true,
  pages: page,
  productionSourceMap: false,
  chainWebpack: (config) => {
    // 添加别名
    config.resolve.alias
      .set('@', resolve('./src'))
      .set('assets', resolve('./src/assets'))
      .set('views', resolve('./src/views'))
      .set('components', resolve('src/components'))

    Object.keys(pages).forEach((entryName) => {
      // 移除 prefetch 插件
      config.plugins.delete(`prefetch-${entryName}`)
      // 移除 preload 插件，避免加载多余的资源
      config.plugins.delete(`preload-${entryName}`)
    })

    // 压缩图片
    config.module
      .rule('images')
      // .test(/\.(png|jpe?g|gif|svg)(\?.*)?$/)
      .use('image-webpack-loader')
      .loader('image-webpack-loader')
      .options({
        mozjpeg: { progressive: true, quality: 65 },
        optipng: { enabled: false },
        pngquant: { quality: [0.65, 0.9], speed: 4 },
        gifsicle: { interlaced: false },
        // webp: { quality: 75 }
      })

    // webpack 会默认给commonChunk打进chunk-vendors，所以需要对webpack的配置进行delete
    config.optimization.delete('splitChunks')
  },
  configureWebpack: (config) => {
    const plugins = []
    if (isProduction) {
      plugins.push(
        new UglifyJsPlugin({
          uglifyOptions: {
            output: {
              comments: false, // 去掉注释
            },
            warnings: false,
            compress: {
              drop_console: true,
              drop_debugger: false,
              pure_funcs: ['console.log'], //移除console
            },
          },
        })
      )
    }

    // externals
    config.externals = {
      vue: 'Vue',
      vuex: 'Vuex',
      'vue-router': 'VueRouter',
      axios: 'axios',
      vant: 'vant',
      vconsole: 'VConsole',
      // jsencrypt: "JSEncrypt",
      // md5: "md5",
      // "crypto-js": "CryptoJS",
      // "js-sha1": "sha1",
      // dsbridge: "dsbridge",
      // gcoord: "gcoord"
    }

    //拆包
    config.optimization = {
      splitChunks: {
        cacheGroups: {
          // 抽取公共代码
          common: {
            name: 'common',
            chunks: 'initial',
            minChunks: 2,
            maxInitialRequests: 5,
            minSize: 0,
            priority: 1,
            reuseExistingChunk: true,
            enforce: true,
          },
          // 抽取公共依赖
          vendors: {
            name: 'vendors',
            test: /[\\/]node_modules[\\/]/,
            chunks: 'initial',
            priority: 2,
            reuseExistingChunk: true,
            enforce: true,
          },
        },
      },
    }

    // 开启gzip压缩
    config.plugins.push(
      new CompressionWebpackPlugin({
        filename: (info) => {
          return `${info.path}.gz${info.query}`
        },
        algorithm: 'gzip',
        threshold: 10240, // 只有大小大于该值的资源会被处理 10240
        test: new RegExp('\\.(' + ['js'].join('|') + ')$'),
        minRatio: 0.8, // 只有压缩率小于这个值的资源才会被处理
        deleteOriginalAssets: false, // 删除原文件
      })
    )
  },
  devServer: {
    index: '/', // 运行时，默认打开/页面
    open: false,
    host: 'localhost',
    port: 8080,
    https: false,
    hotOnly: false,
    proxy: {
      '/proxyApi': {
        target: 'https://test.sxssmk.com',
        changeOrigin: true,
        pathRewrite: {
          '^/proxyApi': '/',
        },
      },
    },
    //在本地服务器开启gzip，线上服务器都支持gzip不需要设置
    before: (app) => {
      // app.get(/.*.(js)$/, (req, res, next) => {
      //   req.url = req.url + ".gz";
      //   res.set("Content-Encoding", "gzip");
      //   next();
      // });
      app.get('/', (req, res) => {
        for (let i in pages) {
          res.write(`<a target="_self" href="/${i}">/${i}</a></br>`)
        }
        res.end()
      })
    },
  },
}
