import * as React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { withRouter } from 'react-router';

import { MuiThemeProvider, getMuiTheme } from 'material-ui/styles';
import LeftDrawer from './common/leftDrawer';
import TopAppBar from './common/topAppBar';
import RouteChanger from './common/routeChanger';
import theme from '../theme';

interface IAppProps {
    currentRoute: any;
}

class App extends React.Component<IAppProps, null> {
    public render(): JSX.Element {
        return (
            <MuiThemeProvider muiTheme={getMuiTheme(theme)}>
                <div className="body" style={{ display: 'flex' }}>
                    <RouteChanger />
                    {this.props.currentRoute.sidebar && <TopAppBar />}
                    {this.props.currentRoute.sidebar && <LeftDrawer />}
                    <div className="container-fluid" style={{ marginTop: 44 }}>
                        {this.props.children}
                    </div>
                </div>
            </MuiThemeProvider>
        );
    }
}

const mapStateToProps = (state, ownProps) => {
    return {
        currentRoute: state.currentRoute
    };
};

export default withRouter(connect(mapStateToProps)(App));
