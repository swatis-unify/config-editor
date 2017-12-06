import * as React from 'react';
import * as _ from 'lodash';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import * as layoutActions from '../../actions/layoutActions';

import { Drawer, ListItem } from 'material-ui';
import routes from '../../routes';

interface ILeftDrawerProps {
    isDrawerOpen: boolean;
    currentRoute: any;
    actions: any;
}

const drawerStyle: React.CSSProperties = {
    position: 'fixed',
    top: 40,
    height: '100vh',
    backgroundColor: '#333',
    zIndex: 1000,
    transition: 'width 0.5s ease-in-out',
    overflow: 'hidden',
    whiteSpace: 'nowrap'
};

class LeftDrawer extends React.Component<ILeftDrawerProps, null> {
    constructor(props, context) {
        super(props, context);

        this.onMenuClick = this.onMenuClick.bind(this);
        this.getItemStyle = this.getItemStyle.bind(this);
    }
    private getDrawerStyle(): React.CSSProperties {
        return this.props.isDrawerOpen ? _.assign({ width: 220 }, drawerStyle) : _.assign({ width: 50 }, drawerStyle);
    }
    private onMenuClick(route) {
        this.props.actions.setRoute(route);
    }
    private getItemStyle(route) {
        if (route.path === this.props.currentRoute.path) {
            return { color: '#009688' };
        }
        return { color: '#757575' };
    }
    private getIconColor(route) {
        if (route.path === this.props.currentRoute.path) {
            return '#009688';
        }
        return '#757575';
    }
    public render(): JSX.Element {
        const menus = _.filter(routes, { sidebar: true }).map(route => {
            return <ListItem
                key={route.id}
                primaryText={route.title}
                style={this.getItemStyle(route)}
                onClick={this.onMenuClick.bind(null, route)}
                leftIcon={route.icon ? <route.icon color={this.getIconColor(route)} /> : null}
            />;
        });
        return (
            <div>
                <Drawer open={true} zDepth={0} containerStyle={this.getDrawerStyle()}>
                    {...menus}
                </Drawer>
            </div >
        );
    }
}

const mapStateToProps = (state, ownProps) => {
    return {
        isDrawerOpen: state.isDrawerOpen,
        currentRoute: state.currentRoute
    };
};
const mapDispatchToProps = (dispatch) => {
    return ({
        actions: bindActionCreators(layoutActions, dispatch)
    });
};
export default connect(mapStateToProps, mapDispatchToProps)(LeftDrawer);
