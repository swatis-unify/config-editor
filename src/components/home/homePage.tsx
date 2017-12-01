import * as React from 'react';
import * as _ from 'lodash';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { withRouter } from 'react-router';

import { SelectField, MenuItem } from 'material-ui';

import * as layoutActions from '../../actions/layoutActions';
import * as contentActions from '../../actions/contentActions';

import FeedTable from './feedtable';

interface IHomePageProps {
    actions: any;
    loggedInUser: any;
    files: { files: any[] };
}

interface IHomePageState {
    branch: string;
}

class HomePage extends React.Component<IHomePageProps, IHomePageState> {
    constructor(props, context) {
        super(props, context);

        this.state = {
            branch: ''
        };

        this.selectBranch = this.selectBranch.bind(this);
    }
    private selectBranch(event, index, branch) {
        this.setState({ branch });

        this.props.actions.fetchContents(branch);
    }
    public render(): JSX.Element {
        const options = _.map(this.props.loggedInUser.branches, (branch: any) => {
            return <MenuItem key={branch.name} value={branch.name} primaryText={branch.name} />;
        });
        return (
            <div>
                <h1>Home Page</h1>
                <SelectField
                    floatingLabelText="Branch"
                    value={this.state.branch}
                    onChange={this.selectBranch}
                >
                    {...options}
                </SelectField>

                {this.props.files.files && this.props.files.files.length && <FeedTable files={this.props.files.files} />}
            </div>
        );
    }
}

const mapStateToProps = (state, ownProps) => {
    return {
        loggedInUser: state.loggedInUser,
        files: state.files
    };
};
const mapDispatchToProps = (dispatch) => {
    return ({
        actions: bindActionCreators(contentActions, dispatch)
    });
};
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(HomePage));
