const path = require('path')

module.exports = {
    entry: {
        main: './src/index.js'
    },
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'bundle')
    },
    module: {
        rules: [
            {
                test: /\.jpg$/,
                use: { loader: 'file-loader' }
            }
        ]
    },
}