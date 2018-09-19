const path = require('path');
const {VueLoaderPlugin} = require('vue-loader');

module.exports = {
     entry: "./www/app/app.js",
     output : {
        path : path.resolve(__dirname, "www/dist"),
        filename : "all.js",
        publicPath:"/public"
     },
     watch : true,
     mode : "development",
     module:{
        rules : [
            {
                test : /\.js$/,
                include: [
                  path.resolve(__dirname, "www/app")
                ],
                exclude: [
                  path.resolve(__dirname, "node_modules")
                ],
                loader : "babel-loader",
                options : {
                    presets: ["es2015"],
                    plugins: ["transform-object-rest-spread"]
                }
            },
            {
                test: /\.vue$/,
                include: [
                  path.resolve(__dirname, "www/app")
                ],
                exclude: [
                  path.resolve(__dirname, "node_modules")
                ],
                loader: 'vue-loader',
                options :{
                    loaders : {
                        stylus:'vue-style-loader!css-loader!stylus-loader'
                    }
                }
            },
            {
                test:/\.css$/,
                use: ['vue-style-loader','css-loader']
            }
        ]
     },
     resolve: {
        alias: {
          'vue$': 'vue/dist/vue.esm.js'
        }
     },
     plugins : [
        new VueLoaderPlugin()
     ],
     devServer :{
        proxy: {
          "/api": {
            target: "http://127.0.0.1:3000", 
            pathRewrite: {"^/api" : "/"}
          }
        }
     }
}