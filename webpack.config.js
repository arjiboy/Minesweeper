module.exports = {
  entry: {
    bundle: './app/index.js'
  },
  output: {
    path: './',
    filename: '[name].js'
  },
  module: {
    resolve: {
      extensions: ['', '.js', '.jsx']
    },
    loaders: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: 'babel',
        query: {
          presets: ['es2015', 'stage-0', 'react']
        }
      }
    ]
  }
}
