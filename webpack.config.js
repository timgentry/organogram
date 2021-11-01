var path = require('path')

var config = {
  devServer: {
    static: path.resolve(__dirname, 'dist'),
    // watchContentBase: true
    open: {
      app: {
        target: 'organogram.html',
        name: 'Google Chrome',
      },
    },
  },
  entry: './src/index.js',
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      },
      {
        test: /\.s[ac]ss$/i,
        use: ['to-string-loader', 'css-loader', 'sass-loader']
      }
    ]
  },
  output: {
    filename: 'organogram.js',
    path: path.resolve(__dirname, 'dist'),
    library: 'organogram'
  },
  resolve: {
    fallback: {
      fs: false
    }
  },
  externals: [
    {
      xlsx: 'XLSX'
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
