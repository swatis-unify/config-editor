import * as React from 'react';
import { AppBar } from 'material-ui';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import * as layoutActions from '../../actions/layoutActions';

interface IAppBarProps {
    actions: any;
}

const topAppBarStyle: React.CSSProperties = {
    position: 'fixed',
    top: 0
};

class TopAppBar extends React.Component<IAppBarProps, null> {
    constructor(props, context) {
        super(props, context);

        this.toggleLeftDrawer = this.toggleLeftDrawer.bind(this);
    }
    private toggleLeftDrawer(event) {
        this.props.actions.toggleLeftDrawer();
    }
    public render(): JSX.Element {
        return (
            <AppBar style={topAppBarStyle} onLeftIconButtonTouchTap={this.toggleLeftDrawer} title={'Config Editor'} />
        );
    }
}

const mapStateToProps = (state, ownProps) => {
    return {
    };
};
const mapDispatchToProps = (dispatch) => {
    return ({
        actions: bindActionCreators(layoutActions, dispatch)
    });
};
export default connect(mapStateToProps, mapDispatchToProps)(TopAppBar);
