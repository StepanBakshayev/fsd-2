const HtmlWebpackPlugin = require('html-webpack-plugin')
const webpack = require('webpack')
const path = require('path')
const fs = require('fs')


const PAGES_DIR = path.join(__dirname, 'pages')
const PAGES = fs.readdirSync(PAGES_DIR).filter(fileName => fileName.endsWith('.pug'))


config = {
    entry: {
        ...Object.fromEntries(PAGES.map(page => [page.split('.')[0], `${PAGES_DIR}/${page}`]))
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
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
            }
        ]
    }
}

module.exports = config
