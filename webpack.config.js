const HtmlWebpackPlugin = require('html-webpack-plugin')
const webpack = require('webpack')
const path = require('path')
const fs = require('fs')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const PnpWebpackPlugin = require(`pnp-webpack-plugin`)


const PAGES_DIR = path.join(__dirname, 'pages')
const PAGES = fs.readdirSync(PAGES_DIR).filter(fileName => fileName.endsWith('.pug'))


config = {
    mode: 'development',
    externals: {
        paths: {assets: 'assets/'}
    },
    entry: {
        'markup/ui-kit': path.resolve(__dirname, './markup/ui-kit.scss'),
        'markup/style': path.resolve(__dirname, './markup/style.scss'),
        ...Object.fromEntries(PAGES.map(page => [page.split('.')[0], `${PAGES_DIR}/${page}`]))
    },
    plugins: [
        // This thing is eat firefox memory.
        // new webpack.HotModuleReplacementPlugin(),
        new MiniCssExtractPlugin({
          filename: 'css/[name].[hash].css',
        }),
        new CopyWebpackPlugin([
          { from: path.join(__dirname, 'assets'), to: 'assets' },
        ]),
        ...PAGES.map(page => new HtmlWebpackPlugin({
            template: `${PAGES_DIR}/${page}`,
            filename: `./${page.replace(/\.pug/,'.html')}`
        }))
    ],
    module: {
        rules: [
            {
                test: /\.pug$/,
                loader: 'pug-loader',
            }, {
              test: /\.scss$/,
              use: [
                'style-loader',
                MiniCssExtractPlugin.loader,
                {
                  loader: 'css-loader',
                  options: { sourceMap: true }
                },{
                  loader: 'sass-loader',
                  options: { sourceMap: true }
                }
              ]
            }
        ]
    },
    resolve: {
      plugins: [
        PnpWebpackPlugin,
      ],
    },
    resolveLoader: {
      plugins: [
        PnpWebpackPlugin.moduleLoader(module),
      ],
    },
}

module.exports = config
