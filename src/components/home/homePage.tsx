import * as React from 'react';
import * as _ from 'lodash';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { withRouter } from 'react-router';

import { SelectField, MenuItem, RaisedButton, FontIcon } from 'material-ui';

import * as layoutActions from '../../actions/layoutActions';
import * as contentActions from '../../actions/contentActions';
import * as loaderActions from '../../actions/loaderActions';

import GithubIcon from '../common/githubIcon';

import ConfigsContainer from '../../configs/configsContainer';
import BranchSelector from '../../branches/branchSelector';

interface IHomePageProps {
    actions: any;
    loggedInUser: any;
}

class HomePage extends React.Component<IHomePageProps, null> {
    constructor(props, context) {
        super(props, context);

        this.syncWithGithub = this.syncWithGithub.bind(this);
    }
    private syncWithGithub() {
        // this.props.actions.fetchBranches().then(() => {
        //     if (this.props.currentBranch) {
        //         this.props.actions.fetchContents(this.props.currentBranch);
        //         this.props.actions.resetConfig();
        //     }
        // });
    }
    public render(): JSX.Element {
        return (
            <div>
                <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                    <BranchSelector />
                    <RaisedButton
                        primary={true}
                        label="Sync with Github"
                        style={{ margin: '0 5px', height: 36, position: 'relative', top: 28 }}
                        onClick={this.syncWithGithub}
                        icon={<GithubIcon height={20} width={20} />}
                    />
                </div>

                <div style={{ margin: '10px 0' }}>
                    <ConfigsContainer />
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state, ownProps) => {
    return {
        loggedInUser: state.loggedInUser,
        currentConfig: state.currentConfig
    };
};
const mapDispatchToProps = (dispatch) => {
    return ({
        actions: bindActionCreators(contentActions, dispatch)
    });
};
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(HomePage));
