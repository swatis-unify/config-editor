import * as React from 'react';
import { AppBar, FlatButton } from 'material-ui';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import style from './appStyle';

// import * as layoutActions from '../../actions/layoutActions';
// import * as authActions from '../../actions/authActions';

interface IAppBarProps {
    actions: any;
    authActions: any;
}

class TopAppBar extends React.Component<IAppBarProps, null> {
    constructor(props, context) {
        super(props, context);

        this.toggleLeftDrawer = this.toggleLeftDrawer.bind(this);
        this.logout = this.logout.bind(this);
    }
    private toggleLeftDrawer(event) {
        this.props.actions.toggleLeftDrawer();
    }
    private logout() {
        this.props.authActions.logout().then(() => {
            this.props.actions.setRoute('/login');
        });
    }
    public render(): JSX.Element {
        const logoutButton = <FlatButton
            label="Logout"
            labelPosition="before"
            icon={<i className="fas fa-sign-out-alt" />}
            onClick={this.logout}
        />;
        return (
            <AppBar style={style.topAppBarStyle} iconElementRight={logoutButton} onLeftIconButtonTouchTap={this.toggleLeftDrawer} title={'Config Editor'} />
        );
    }
}

const mapStateToProps = (state, ownProps) => {
    return {
    };
};
const mapDispatchToProps = (dispatch) => {
    return {
        actions: {},
        authActions: {}
    };
};
export default connect(mapStateToProps, mapDispatchToProps)(TopAppBar);