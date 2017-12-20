import * as React from 'react';
import * as _ from 'lodash';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { withRouter } from 'react-router';

import { MuiThemeProvider, getMuiTheme } from 'material-ui/styles';
import LeftDrawer from './leftDrawer';
import TopAppBar from './topAppBar';
import RouteChanger from './routeChanger';
import Loader from './loader';
// import ErrorSnackbar from './common/errorSnackbar';
import theme from '../theme';

import style from './appStyle';

interface IAppProps {
    currentRoute: any;
    callsInProgress: number;
    isDrawerOpen: boolean;
}

class App extends React.Component<IAppProps, null> {
    constructor(props, context) {
        super(props, context);

        this.getContainerStyle = this.getContainerStyle.bind(this);
    }
    private getContainerStyle(): React.CSSProperties {
        if (!this.props.currentRoute.sidebar) {
            return style.containerStyle;
        }
        return this.props.isDrawerOpen ? _.assign({}, style.containerStyle, style.containerWithDrawer) : _.assign({}, style.containerStyle, style.containerWithoutDrawer);
    }
    public render(): JSX.Element {
        // To-Do - swati - Save theme in the store to get access of colors and configured settings.
        // Not done for now, coz I don't need those information in many places
        return (
            <MuiThemeProvider muiTheme={getMuiTheme(theme)}>
                <div className="body" style={style.body}>
                    <RouteChanger />
                    {/* {(this.props.callsInProgress > 0) && <Loader />} */}
                    {this.props.currentRoute.sidebar && <TopAppBar />}
                    {this.props.currentRoute.sidebar && <LeftDrawer />}
                    <div className="container-fluid" style={this.getContainerStyle()}>
                        <h2>{this.props.currentRoute.title}</h2>
                        {this.props.children}
                    </div>
                    {/* <ErrorSnackbar /> */}
                </div>
            </MuiThemeProvider>
        );
    }
}

const mapStateToProps = (state, ownProps) => {
    return {
        currentRoute: state.currentRoute,
        callsInProgress: state.callsInProgress,
        isDrawerOpen: state.isDrawerOpen
    };
};

export default withRouter(connect(mapStateToProps)(App));
