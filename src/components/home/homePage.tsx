import * as React from 'react';
import * as _ from 'lodash';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { withRouter } from 'react-router';

import { SelectField, MenuItem, RaisedButton, FontIcon } from 'material-ui';

import * as layoutActions from '../../actions/layoutActions';
import * as contentActions from '../../actions/contentActions';

import FeedTable from './feedtable';
import GithubIcon from '../common/githubIcon';

interface IHomePageProps {
    actions: any;
    layoutActions: any;
    loggedInUser: any;
    feeds: any[];
}

interface IHomePageState {
    branch: string;
    filter: any;
}

interface IHeader {
    title: string;
    sortable?: boolean;
    attribute?: string;
}

const SortDirection = {
    asc: 1,
    desc: 0
};

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
            branch: '',
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
    }
    private getFilteredFeeds() {
        const { feeds } = this.props;
        return _.orderBy(feeds, _.keys(this.state.filter), _.values(this.state.filter));
    }
    private selectBranch(event, index, branch) {
        this.setState({ branch });

        this.props.actions.fetchContents(branch);
    }
    public onEdit(name) {
        const feed = _.find(this.props.feeds, { name });
        if (feed) {
            this.props.actions.fetchConfig(feed).then(() => {
                this.props.layoutActions.setRoute('/partnerconfig');
            });
        }
    }
    public onCreateNew(feedUrl) {
        this.props.actions.createConfig(feedUrl);
    }
    public updateFilter(filterName, value) {
        const { filter } = this.state;

        filter[filterName] = value;
        this.setState({ filter });
    }
    public componentWillMount() {
        this.props.actions.fetchBranches();
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
                        value={this.state.branch}
                        onChange={this.selectBranch}
                    >
                        {...options}
                    </SelectField>
                    <RaisedButton
                        primary={true}
                        label="Sync with Github"
                        style={{ margin: '0 5px', height: 36, position: 'relative', top: 28 }}
                        icon={<GithubIcon height={20} width={20} />}
                    />
                </div>
                <div>
                    {(this.props.feeds.length > 0) && <FeedTable headers={this.tableHeaders} filter={this.state.filter} feeds={this.getFilteredFeeds()} onSort={this.updateFilter} onEdit={this.onEdit} onCreateNew={this.onCreateNew} />}
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state, ownProps) => {
    return {
        loggedInUser: state.loggedInUser,
        feeds: state.feeds
    };
};
const mapDispatchToProps = (dispatch) => {
    return ({
        actions: bindActionCreators(contentActions, dispatch),
        layoutActions: bindActionCreators(layoutActions, dispatch)
    });
};
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(HomePage));
