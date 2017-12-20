import * as React from 'react';

import { Card, CardHeader, CardText, RaisedButton } from 'material-ui';

import GithubIcon from '../components/common/githubIcon';
import style from './loginStyle';

import * as loginActions from './loginActions';
import config from './config';

class LogInPage extends React.Component<null, null> {
    constructor(props, context) {
        super(props, context);
    }
    private startLoginProcess() {
        // redirect to github
        const authUrl = config.authUrl;
        const params = {
            client_id: config.clientId,
            redirect_uri: config.redirectUri,
            scope: config.scope,
            state: config.state,
            allow_signup: config.allowSignup
        };

        const query = Object.keys(params)
            .map(k => encodeURIComponent(k) + '=' + encodeURIComponent(params[k]))
            .join('&');

        window.location.href = `${authUrl}?${query}`;
    }
    public render(): JSX.Element {
        return (
            <div style={style.wrapperStyle}>
                <div style={style.loginFormContainer}>
                    <Card>
                        <CardText style={style.cardText}>
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
