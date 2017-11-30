import * as path from 'path';
import * as webpack from 'webpack';

// for custom apis
import axios from 'axios';
import * as session from 'express-session';

// Plugins
// import * as HtmlWebpackPlugin from 'html-webpack-plugin';
import * as ExtractTextPlugin from 'extract-text-webpack-plugin';

const sourcePath: string = path.join(__dirname, './src');
const outPath: string = path.join(__dirname, './dist');

// Production Plugins
const plugins: webpack.Plugin[] = [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin(),
    new webpack.optimize.AggressiveMergingPlugin(),
    new webpack.optimize.ModuleConcatenationPlugin(),
    new ExtractTextPlugin({
        filename: 'styles.css',
        disable: true
    }),
    // new HtmlWebpackPlugin({
    //     title: 'Unify'
    // })
    // new CircularDependencyPlugin({
    //     // exclude detection of files based on a RegExp
    //     exclude: /a\.js|node_modules/,
    // })
];


// Config
const config: webpack.Configuration = {
    context: sourcePath,
    entry: {
        main: './index.tsx'
    },
    output: {
        path: outPath,
        publicPath: '/',
        filename: 'bundle.js',
    },
    target: 'web',
    resolve: {
        extensions: ['.js', '.ts', '.tsx'],
        // Fix webpack's default behavior to not load packages with jsnext:main module
        // https://github.com/Microsoft/TypeScript/issues/11677
        mainFields: ['main']
    },
    module: {
        loaders: [
            // .ts, .tsx
            {
                test: /\.tsx?$/,
                enforce: 'pre',
                loader: 'tslint-loader',
                options: {
                    configFile: './tslint.json'
                }
            },
            {
                test: /\.tsx?$/,
                loader: 'awesome-typescript-loader'
            },
            // css
            {
                test: /\.css$/,
                use: ExtractTextPlugin.extract({
                    fallback: "style-loader",
                    use: "css-loader"
                })
            },
            {
                test: /\.less$/,
                use: [{
                    loader: "style-loader" // creates style nodes from JS strings
                }, {
                    loader: "css-loader" // translates CSS into CommonJS
                }, {
                    loader: "less-loader" // compiles Less to CSS
                }]
            },
            // static assets
            { test: /\.html$/, loader: 'html-loader' },
            { test: /\.(png|jpg|woff|woff2|eot|ttf|svg)$/, loader: 'url-loader' }
        ],
    },
    plugins: plugins,
    devServer: {
        compress: true,
        hot: true,
        contentBase: sourcePath,
        historyApiFallback: true,
        overlay: {
            warnings: false,
            errors: true
        },
        stats: 'normal',
        watchContentBase: true,
        disableHostCheck: true,
        before(app) {
            app.use(session({ secret: '123abc' }));
            app.get('/accesstoken', (req, res) => {
                const code = req.query.code;
                const params = {
                    client_id: '2e073bdb7347eaf52902',
                    client_secret: '775ef3c1c85f5334957f06fb14037d341ebd045b',
                    code: code
                };
                const query = Object.keys(params)
                    .map(k => encodeURIComponent(k) + '=' + encodeURIComponent(params[k]))
                    .join('&');

                req.session.user = {};
                axios({
                    method: 'post',
                    url: `https://github.com/login/oauth/access_token?${query}`,
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json',
                        'credentials': 'include'
                    }
                }).then((response) => {
                    console.log('success: ');
                    req.session.user.access_token = response.data.access_token;
                    res.json(response.data);
                }).catch((error) => {
                    req.session.user.access_token = '';
                    console.log('Error');
                    res.json(error);
                });
            });

            app.get('/user', (req, res) => {
                if (!(req.session.user && req.session.user.access_token)) {
                    res.status(401).send('Login required');
                } else {
                    const params = {
                        access_token: req.session.user.access_token
                    };
                    const query = Object.keys(params)
                        .map(k => encodeURIComponent(k) + '=' + encodeURIComponent(params[k]))
                        .join('&');

                    axios({
                        method: 'get',
                        url: `https://github.com/repos/swatis-unify/profileBuilder/branches?${query}`,
                        headers: {
                            'Accept': 'application/json',
                            'Content-Type': 'application/json'
                        }
                    }).then((response) => {
                        res.json(response.data);
                    }).catch((error) => {
                        res.status(500).send('Failed to fetch branches');
                    });
                }
            });
        }
    },
    node: {
        // workaround for webpack-dev-server issue
        // https://github.com/webpack/webpack-dev-server/issues/60#issuecomment-103411179
        fs: 'empty',
        net: 'empty'
    }
};

export default config;
