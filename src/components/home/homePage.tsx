import * as React from 'react';
import * as _ from 'lodash';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { withRouter } from 'react-router';

import { SelectField, MenuItem, RaisedButton, FontIcon } from 'material-ui';

import * as layoutActions from '../../actions/layoutActions';
import * as contentActions from '../../actions/contentActions';
import * as loaderActions from '../../actions/loaderActions';

import FeedTable from './feedtable';
import GithubIcon from '../common/githubIcon';

interface IHomePageProps {
    actions: any;
    layoutActions: any;
    loaderActions: any;
    loggedInUser: any;
    feeds: any[];
    currentBranch: string;
    currentConfig: any;
}

interface IHomePageState {
    filter: any;
}

interface IHeader {
    title: string;
    sortable?: boolean;
    attribute?: string;
}

class HomePage extends React.Component<IHomePageProps, IHomePageState> {
    private tableHeaders: IHeader[];
    constructor(props, context) {
        super(props, context);

        this.tableHeaders = [
            {
                title: 'Partner',
                sortable: true,
                attribute: 'data_partner_name'
            },
            {
                title: 'Feed Type',
                sortable: true,
                attribute: 'feed_name'
            },
            {
                title: 'Actions'
            }
        ];

        this.state = {
            filter: {
                data_partner_name: 'asc',
                feed_name: 'asc'
            }
        };

        this.selectBranch = this.selectBranch.bind(this);
        this.getFilteredFeeds = this.getFilteredFeeds.bind(this);
        this.updateFilter = this.updateFilter.bind(this);
        this.onEdit = this.onEdit.bind(this);
        this.onCreateNew = this.onCreateNew.bind(this);
        this.syncWithGithub = this.syncWithGithub.bind(this);
    }
    private getFilteredFeeds() {
        const { feeds } = this.props;
        return _.orderBy(feeds, _.keys(this.state.filter), _.values(this.state.filter));
    }
    private selectBranch(event, index, branch) {
        this.props.actions.setBranch(branch);
        this.props.actions.fetchContents(branch);
    }
    public onEdit(name) {
        const feed = _.find(this.props.feeds, { name });
        if (feed) {
            if (this.props.currentConfig.path === feed.path) {
                this.props.layoutActions.setRoute('/partnerconfig', { path: feed.path, branch: this.props.currentBranch });
            } else {
                this.props.actions.fetchConfig(feed, this.props.currentBranch).then(() => {
                    this.props.layoutActions.setRoute('/partnerconfig', { path: feed.path, branch: this.props.currentBranch });
                });
            }
        }
    }
    public onCreateNew(name) {
        const feed = _.find(this.props.feeds, { name });
        if (feed) {
            if (this.props.currentConfig.path === feed.path) {
                this.props.layoutActions.setRoute('/partnerconfig', { path: feed.path, branch: this.props.currentBranch, copyasnew: true });
            } else {
                this.props.actions.fetchConfig(feed, this.props.currentBranch).then(() => {
                    this.props.layoutActions.setRoute('/partnerconfig', { path: feed.path, branch: this.props.currentBranch, copyasnew: true });
                });
            }
        }
    }
    public updateFilter(filterName, value) {
        const { filter } = this.state;

        filter[filterName] = value;
        this.setState({ filter });
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
                    {(this.props.feeds.length > 0) && <FeedTable headers={this.tableHeaders} filter={this.state.filter} feeds={this.getFilteredFeeds()} onSort={this.updateFilter} onEdit={this.onEdit} onCreateNew={this.onCreateNew} />}
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
