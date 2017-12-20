import * as React from 'react';
import * as _ from 'lodash';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { withRouter } from 'react-router';

interface IRouteChangerProps {
    currentRoute: any;
    history: any;
}

// dummy component just to have a hold of current route and derive ui from it
class RouteChanger extends React.Component<IRouteChangerProps, null> {
    constructor(props, context) {
        super(props, context);
    }
    private buildQuery(data) {
        const query = [];
        _.forEach(data, (value, key) => {
            query.push(encodeURIComponent(key) + "=" + encodeURIComponent(value));
        });
        return query.join("&");
    }
    public componentWillReceiveProps(nextProps) {
        if (this.props.currentRoute !== nextProps.currentRoute) {
            const path = nextProps.currentRoute.data ? `${nextProps.currentRoute.path}?${this.buildQuery(nextProps.currentRoute.data)}` : nextProps.currentRoute.path;
            this.props.history.push(path);
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
