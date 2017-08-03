const production = process.env.NODE_ENV === 'production';
var path = require('path');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');

let plugins = [];

if (production) {
  console.log('NODE_ENV production mode');
  plugins = plugins.concat([
    new UglifyJSPlugin()
  ]);
}

module.exports = {
  entry: './src/index.js',
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [ 'style-loader', 'css-loader' ]
      }
    ]
  },
  output: {
    filename: 'organogram.js',
    path: path.resolve(__dirname, 'dist'),
    library: "organogram"
  },
  node: {
    fs: "empty"
  },
  externals: [
    {
      './cptable': 'var cptable'
    }
  ],
  plugins: plugins
};
