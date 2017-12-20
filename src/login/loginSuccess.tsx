import * as React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import * as loginActions from './loginActions';

interface ILoginSuccessProps {
    actions: any;
}

class LoginSuccessPage extends React.Component<ILoginSuccessProps, null> {
    public componentDidMount() {
        const params = new URL(window.location.href).searchParams;
        const state = params.get('state');
        const code = params.get('code');

        this.props.actions.fetchAccessToken(code, state).then(() => {
            // this.props.layoutActions.setRoute('/');
        });
    }

    public render(): JSX.Element {
        return (<div className="login-wrapper" />);
    }

}

const mapStateToProps = (state, ownProps) => {
    return {
    };
};
const mapDispatchToProps = (dispatch) => {
    return ({
        actions: bindActionCreators(loginActions, dispatch)
    });
};
export default connect(mapStateToProps, mapDispatchToProps)(LoginSuccessPage);
