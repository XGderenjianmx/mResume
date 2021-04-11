//打包配置
const path = require('path')
const resolve = function (dir) {
  return path.join(__dirname, dir)
}
module.exports = {
  publicPath: process.env.NODE_ENV === 'production' ? '/' : '/',//打包后文件引用路径
  outputDir: process.env.VUE_APP_OUTPUT_DIR,//指定输出文件夹,默认是'dist'
  assetsDir: 'static',//静态资源文件夹
  lintOnSave: true, // 是否开启eslint保存检测
  productionSourceMap: false, // 是否在构建生产包时生成sourcdeMap
  chainWebpack: (config) => {
    if (process.env.NODE_ENV === 'production') {
      // 测试生产环境, 不压缩js代码
      if (process.env.VUE_APP_CURRENTMODE === 'test') {
        config.optimization.minimize(false)
      }
    }
    config.resolve.alias
      .set('@', resolve('src'))
      .set('@views', resolve('src/views'))
      .set('@assets', resolve('src/assets'))
    // 设置title，在public-->index.html中
    config.plugin('html')
      .tap(args => {
        args[0].title = 'mResume'
        return args
      })

  },
  devServer: {
    host: 'localhost',
    port: '8080',
    hot: true,
    open: true,
    overlay: {
      warning: false,
      error: true,
    },
    proxy: {
      [process.env.VUE_APP_BASE_RUL]: {
        target: process.env.VUE_APP_BASE_RUL,

        changeOrigin: true, // 是否修改重写，一般在生产环境才需要改为true，也可独配置开发环节的VUE_APP_BASE_RUL
        secure: false,
        pathRewrite: {
          ['^' + process.env.VUE_APP_BASE_RUL]: '',
        },
      },
    },
  },
  css: {
    loaderOptions: {
      sass: {
        prependData: `@import "./src/assets/mixin";`,
      },
    },
  },
}
