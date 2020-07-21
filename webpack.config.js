const isDev = process.env.NODE_ENV === 'development'

module.exports = {
  mode: isDev ? 'development' : 'production',
  entry: [
    '@babel/polyfill', // enables async-await
    './client/index.js'
  ],
  output: {
    path: __dirname,
    filename: './public/bundle.js'
  },
  resolve: {
    extensions: ['.js', '.jsx']
  },
  devtool: 'source-map',
  watchOptions: {
    ignored: /node_modules/
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: 'babel-loader'
      },
      // {
      //   test: /\.(gif|svg|jpg|png)$/,
      //   loader: 'file-loader'
      //   // options: {
      //   //   esModule: false,
      //   // }
      // }

      // {
      //   test: /\.(png|svg|jpe?g|gif)$/,
      //   include: /images/,
      //   use: [
      //     {
      //       loader: 'file-loader',
      //       options: {
      //         name: '[name].[ext]',
      //         outputPath: 'public/assets',
      //         publicPath: 'public/'
      //       }
      //     }
      //   ]
      // }
    ]
  }
}
