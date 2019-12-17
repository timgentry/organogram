var path = require('path')

var config = {
  devServer: {
    contentBase: path.join(__dirname, 'dist'),
    openPage: 'organogram.html'
    // watchContentBase: true
  },
  entry: './src/index.js',
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      }
    ]
  },
  output: {
    filename: 'organogram.js',
    path: path.resolve(__dirname, 'dist'),
    library: 'organogram'
  },
  node: {
    fs: 'empty'
  },
  externals: [
    {
      './cptable': 'var cptable'
    }
  ]
}

module.exports = (env, argv) => {
  if (argv.mode === 'development') {
    config.devtool = 'source-map'
  }

  if (argv.mode === 'production') {
    // ...
  }

  return config
}
