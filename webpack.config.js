module.exports = {
  entry: './src/index.js',
  output: {
    path: './public',
    filename: 'index.js'
  },
  devtool: 'source-map',
  module: {
    loaders: [{
      test: /\.js$/,
      exclude: /node_modules/,
      loader: 'babel-loader'
    }]
  }
}
