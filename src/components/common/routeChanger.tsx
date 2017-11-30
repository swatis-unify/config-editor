import * as React from 'react';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { withRouter } from 'react-router';

interface IRouteChangerProps {
    currentRoute: any;
    history: any;
}

// dummy component just to have a hols of current route and derive ui from it
class RouteChanger extends React.Component<IRouteChangerProps, null> {
    constructor(props, context) {
        super(props, context);
    }
    public componentWillReceiveProps(nextProps) {
        if (this.props.currentRoute !== nextProps.currentRoute) {
            this.props.history.push(nextProps.currentRoute.path);
        }
    }

    public render(): JSX.Element {
        return <div />;
    }
}

const mapStateToProps = (state, ownProps) => {
    return {
        currentRoute: state.currentRoute
    };
};

export default withRouter(connect(mapStateToProps)(RouteChanger));
