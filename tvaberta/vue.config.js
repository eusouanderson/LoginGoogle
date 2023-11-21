const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true
})
module.exports = {
  devServer: {
    proxy: {
      '/api': {
        target: 'https://programacao.netcombo.com.br',
        changeOrigin: true,
        pathRewrite: {
          '^/api': '/gatekeeper/canal/select',
        },
      },
    },
  },
};

