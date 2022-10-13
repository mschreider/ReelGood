const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

/*
TODO REMOVE: https://stackoverflow.com/questions/50824024/urierror-failed-to-decode-param-public-url-favicon-ico
https://stackoverflow.com/questions/71356327/error-caching-was-left-unconfigured-babels-plugins-when-i-installed-font-awes
*/

module.exports = ({ mode } = { mode: "production" }) => {
    console.log(`mode is: ${mode}`);

    return {
            mode,
            entry: "./src/index.js",
            output: {
                publicPath: "/",
                path: path.resolve(__dirname, "build"),
                filename: "bundled.js"
            },
            module: {
                rules: [
                    {
                        test: /\.(jpg|jpeg|png|gif|mp3|svg|ico)$/,
                        exclude: /node_modules/,
                        use: ['file-loader?name=[name].[ext]']
                    },
                    {
                        test: /\.(js|jsx)$/,
                        exclude: /node_modules/,
                        loader: "babel-loader"
                    },
                    {
                        test: /\.(css|scss|less)$/i,
                        use: [
                          "style-loader", "css-loader", "less-loader"],
                    },
                    {
                        test: /\.svg$/,
                        use: [
                          {
                            loader: 'svg-url-loader',
                            options: {
                              limit: 10000,
                            },
                          },
                        ],
                    }
                ]
            },
            plugins: [
                new HtmlWebpackPlugin({
                    template: "./public/index.html",
                    filename: './index.html',
                    favicon: './public/favicon.ico'
                })
            ]
        }
};