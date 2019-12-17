var config = {
  devServer: {
    contentBase: __dirname + '/dist',
    openPage: 'organogram.html'
    // watchContentBase: true
  },
  entry: {
    organogram: './src/index.js',
    organogram_3d: './src/index_3d.js'
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      }
    ]
  },
  output: {
    filename: '[name].js',
    path: __dirname + '/dist',
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
