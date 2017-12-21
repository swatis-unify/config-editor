import * as React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import * as authActions from '../../actions/authActions';
import * as layoutActions from '../../actions/layoutActions';
import authConfig from './authConfig';
import style from './loginStyle';

interface ILoginSuccessProps {
    authActions: any;
    layoutActions: any;
}

class LoginSuccessPage extends React.Component<ILoginSuccessProps, null> {

    public componentDidMount() {
        const params = new URL(window.location.href).searchParams;
        const state = params.get('state');
        const code = params.get('code');

        if (state === authConfig.state) {
            this.props.authActions.fetchAccessToken(code, state).then(() => {
                this.props.layoutActions.setRoute('/');
            });
        } else {
            this.props.layoutActions.setRoute('/login');
        }
    }

    public render(): JSX.Element {
        return (<div style={style.wrapper} />);
    }

}

const mapStateToProps = (state, ownProps) => {
    return {
    };
};
const mapDispatchToProps = (dispatch) => {
    return ({
        authActions: bindActionCreators(authActions, dispatch),
        layoutActions: bindActionCreators(layoutActions, dispatch)
    });
};
export default connect(mapStateToProps, mapDispatchToProps)(LoginSuccessPage);
