import * as path from 'path';
import * as webpack from 'webpack';

import Github from './src/helpers/github';
import apiConfig from './api_config';

// for custom apis
import * as session from 'express-session';
import * as bodyParser from 'body-parser';

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
            const jsonParser = bodyParser.json();
            app.get('/accesstoken', (req, res) => {
                const code = req.query.code;
                req.session.user = {};
                Github.instance.getAccessToken(apiConfig.clientId, apiConfig.clientSecret, code)
                    .then((response) => {
                        req.session.user.loggedIn = true;
                        res.json({ loggedIn: true });
                    })
                    .catch((error) => {
                        req.session.user.loggedIn = false;
                        console.log('Error: ', error);
                        res.status(500).send('Failed to login');
                    });
            });

            app.get('/user', (req, res) => {
                if (req.session.user && req.session.user.loggedIn) {
                    res.json({ loggedIn: true });
                } else {
                    res.json({ loggedIn: false });
                }
            });

            app.get('/branches', (req, res) => {
                if (!(req.session.user && req.session.user.loggedIn)) {
                    res.status(401).send('Login required');
                } else {
                    Github.instance.getBranches(apiConfig.repoOwner, apiConfig.repoName)
                        .then((branches) => {
                            res.json(branches);
                        })
                        .catch((error) => {
                            console.log('error: ', error);
                            res.status(500).send('failed to fetch branches');
                        });
                }
            });

            app.get('/contents', (req, res) => {
                const branch = req.query.branch;
                if (!(req.session.user && req.session.user.loggedIn)) {
                    res.status(401).send('Login required');
                } else {
                    Github.instance.getContents(apiConfig.repoOwner, apiConfig.repoName, apiConfig.sourcePath, branch)
                        .then((contents) => {
                            res.json(contents);
                        })
                        .catch((error) => {
                            res.status(500).send('failed to fetch contents');
                        });
                }
            });

            app.get('/config', (req, res) => {
                const filePath = req.query.filePath;
                const branch = req.query.branch;
                if (!(req.session.user && req.session.user.loggedIn)) {
                    res.status(401).send('Login required');
                } else {
                    Github.instance.getContents(apiConfig.repoOwner, apiConfig.repoName, filePath, branch)
                        .then((result) => {
                            res.json(result);
                        })
                        .catch((error) => {
                            console.log('Error: ', error);
                            res.status(500).send('failed to fetch config');
                        });
                }
            });

            app.post('/logout', (req, res) => {
                req.session.destroy(() => {
                    res.json({ success: true });
                });
            });

            app.post('/pushChanges', jsonParser, (req, res) => {
                const { contents, sha, branch } = req.body;
                const filePath = req.body.path;

                Github.instance.pushChanges(apiConfig.repoOwner,
                    apiConfig.repoName,
                    filePath,
                    branch,
                    contents,
                    sha
                )
                    .then(() => { res.json({ "status": "OK" }); })
                    .catch((error) => { res.status(500).send(JSON.stringify(error)); });
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
