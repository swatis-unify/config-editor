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

interface IHomePageProps {
    actions: any;
    layoutActions: any;
    loaderActions: any;
    loggedInUser: any;
    currentBranch: string;
    currentConfig: any;
}

class HomePage extends React.Component<IHomePageProps, null> {
    constructor(props, context) {
        super(props, context);

        this.selectBranch = this.selectBranch.bind(this);
        this.syncWithGithub = this.syncWithGithub.bind(this);
    }
    private selectBranch(event, index, branch) {
        this.props.actions.setBranch(branch);
        // this.props.actions.fetchContents(branch);
    }
    public componentWillMount() {
        if (!this.props.loggedInUser.branches) {
            this.props.actions.fetchBranches();
        }
        if (this.props.currentBranch && !this.props.feeds.length) {
            this.props.actions.fetchContents(this.props.currentBranch);
        }
    }
    private syncWithGithub() {
        this.props.actions.fetchBranches().then(() => {
            if (this.props.currentBranch) {
                this.props.actions.fetchContents(this.props.currentBranch);
                this.props.actions.resetConfig();
            }
        });
    }
    public render(): JSX.Element {
        const options = _.map(this.props.loggedInUser.branches, (branch: any) => {
            return <MenuItem key={branch.name} value={branch.name} primaryText={branch.name} />;
        });

        return (
            <div>
                <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                    <SelectField
                        floatingLabelText="Branch"
                        value={this.props.currentBranch}
                        onChange={this.selectBranch}
                    >
                        {...options}
                    </SelectField>
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
        feeds: state.feeds,
        currentBranch: state.currentBranch,
        currentConfig: state.currentConfig
    };
};
const mapDispatchToProps = (dispatch) => {
    return ({
        actions: bindActionCreators(contentActions, dispatch),
        layoutActions: bindActionCreators(layoutActions, dispatch),
        loaderActions: bindActionCreators(loaderActions, dispatch)
    });
};
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(HomePage));
