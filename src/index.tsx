import 'babel-polyfill';
import * as React from 'react';
import { render } from 'react-dom';
import createHistory from 'history/createBrowserHistory';
import configureStore from './store/configureStore';
import { Provider } from 'react-redux';
import { Router, Route, IndexRoute } from 'react-router';
import App from './components/app';
import HomePage from './components/home/homePage';
import routes from './routes';
import '../node_modules/bootstrap/dist/css/bootstrap.css';

const store = configureStore();
const history = createHistory();
const appRoutes = routes.map(route => <Route path={route.path} exact={true} component={route.component} key={route.id} />);

render(
    <Provider store={store}>
        <Router history={history}>
            <App>
                {...appRoutes}
            </App>
        </ Router>
    </ Provider>,
    document.getElementById('app')
);
