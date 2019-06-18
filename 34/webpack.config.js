const path = require('path')

module.exports = {
    mode: 'development',
    entry: {
        bundle: './src/index.js'
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: '[name].js'
    },
    resolveLoader: { //先在node_modules中找loader，如果没有在./loaders路径下找loader
        modules: ['node_modules', './loader']
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                use: [
                    {
                        loader: 'replaceLoader',
                    },
                    {
                        loader: 'replaceLoaderAsync',
                        options: {
                            name: 'wu'
                        }
                    }
                ]
            }
        ]
    }
}