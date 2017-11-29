import * as React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { MuiThemeProvider, getMuiTheme } from 'material-ui/styles';
import LeftDrawer from './common/leftDrawer';
import TopAppBar from './common/topAppBar';
import RouteChanger from './common/routeChanger';
import theme from '../theme';

interface IAppProps {
    loggedInUser: any;
}

class App extends React.Component<IAppProps, null> {
    public render(): JSX.Element {
        return (
            <MuiThemeProvider muiTheme={getMuiTheme(theme)}>
                <div className="body" style={{ display: 'flex' }}>
                    <RouteChanger />
                    {this.props.loggedInUser.access_token && <TopAppBar />}
                    {this.props.loggedInUser.access_token && <LeftDrawer />}
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
        loggedInUser: state.loggedInUser
    };
};

export default connect(mapStateToProps)(App);
