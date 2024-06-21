const path = require('path');
const webpack = require('webpack');
const webpackConfig = require('./webpack.config');

const compiler = webpack(webpackConfig);

const devServerOptions = Object.assign({}, webpackConfig.devServer, {
  open: true,
  stats: {
    colors: true,
  },
});

const webpackDevServer = require('webpack-dev-server');
const server = new webpackDevServer(compiler, devServerOptions);

server.listen(3000, 'localhost', (err) => {
  if (err) {
    console.error(err);
  }
  console.log('Dev server listening on http://localhost:3000');
});
