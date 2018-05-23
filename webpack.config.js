module.exports = {
  entry: "./lib/lollygag.js",
  output: {
  	filename: "./lib/bundle.js"
  },
  module: {
  loaders: [
    {
      test: [/\.jsx?$/, /\.js?$/],
      exclude: /node_modules/,
      loader: 'babel-loader',
      query: {
        presets: ['env', 'react']
      }
    }
  ]
},
  devtool: 'source-map',
};
