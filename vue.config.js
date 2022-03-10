const path = require('path');

module.exports = {
  pages: {
    index: {
      entry: 'frontend/src/main',
      title: 'Index Page',
    },
  },

  configureWebpack: {
    resolve: {
      alias: {
        '@': path.join(__dirname, 'frontend/src/')
      },
    },
  },
}