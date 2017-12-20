import * as React from 'react';
import * as _ from 'lodash';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { Drawer, ListItem } from 'material-ui';
import routes from '../routes';
import style from './appStyle';
import * as routingActions from './routingActions';

interface ILeftDrawerProps {
    isDrawerOpen: boolean;
    currentRoute: any;
    actions: any;
}

class LeftDrawer extends React.Component<ILeftDrawerProps, null> {
    constructor(props, context) {
        super(props, context);

        this.onMenuClick = this.onMenuClick.bind(this);
        this.getItemStyle = this.getItemStyle.bind(this);
    }
    private getDrawerStyle(): React.CSSProperties {
        return this.props.isDrawerOpen ? _.assign({}, style.drawerStyle, style.drawerOpen) : _.assign({}, style.drawerStyle, style.drawerClose);
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
        actions: bindActionCreators(routingActions, dispatch)
    });
};
export default connect(mapStateToProps, mapDispatchToProps)(LeftDrawer);
