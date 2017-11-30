import * as React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { withRouter } from 'react-router';

import * as layoutActions from '../../actions/layoutActions';

interface IHomePageProps {
    actions: any;
    loggedInUser: any;
}

class HomePage extends React.Component<IHomePageProps, null> {
    // public componentWillMount() {
    //     if (!this.props.loggedInUser.access_token) {
    //         this.props.actions.setRoute('/login');
    //     }
    // }
    public render(): JSX.Element {
        return (
            <div>
                <h1>Home Page</h1>
            </div>
        );
    }
}

const mapStateToProps = (state, ownProps) => {
    return {
        loggedInUser: state.loggedInUser
    };
};
const mapDispatchToProps = (dispatch) => {
    return ({
        actions: bindActionCreators(layoutActions, dispatch)
    });
};
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(HomePage));
