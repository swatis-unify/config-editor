import * as React from 'react';
import authConfig from './authConfig';

import { Card, CardHeader, CardText, RaisedButton } from 'material-ui';
import ActionHome from 'material-ui/svg-icons/action/home';

import GithubIcon from '../common/githubIcon';
import './loginStyles.css';

class LogInPage extends React.Component<null, null> {
    constructor(props, context) {
        super(props, context);
    }
    private startLoginProcess() {
        console.log('start login called');
        // redirect to github
        const authUrl = authConfig.authUrl;
        const params = {
            client_id: authConfig.clientId,
            redirect_uri: authConfig.redirectUri,
            scope: authConfig.scope,
            state: authConfig.state,
            allow_signup: authConfig.allowSignup
        };

        const query = Object.keys(params)
            .map(k => encodeURIComponent(k) + '=' + encodeURIComponent(params[k]))
            .join('&');

        window.location.href = `${authUrl}?${query}`;
    }
    public render(): JSX.Element {
        return (
            <div className="login-wrapper">
                <div style={{ display: 'flex', justifyContent: 'center', position: 'relative', top: '40%' }}>
                    <Card className="col-md-4">
                        <CardText style={{ textAlign: 'center' }}>
                            <h3>Login with GitHub to get started</h3>
                            <RaisedButton
                                primary={true}
                                label={'Login With GitHub'}
                                onClick={this.startLoginProcess}
                                icon={<GithubIcon width={20} height={20} />}
                            />
                        </CardText>
                    </Card>
                </div>
            </div>
        );
    }
}


export default LogInPage;
