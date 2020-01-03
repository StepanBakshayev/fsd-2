const HtmlWebpackPlugin = require('html-webpack-plugin')
const webpack = require('webpack')
const path = require('path')
const fs = require('fs')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')


const PAGES_DIR = path.join(__dirname, 'pages')
const PAGES = fs.readdirSync(PAGES_DIR).filter(fileName => fileName.endsWith('.pug'))


config = {
    entry: {
        'markup/ui-kit': path.resolve(__dirname, './markup/ui-kit.scss'),
        ...Object.fromEntries(PAGES.map(page => [page.split('.')[0], `${PAGES_DIR}/${page}`]))
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new MiniCssExtractPlugin({
          filename: 'css/[name].[hash].css',
        }),
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
    }
}

module.exports = config
