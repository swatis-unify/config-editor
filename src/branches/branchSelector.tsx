import * as React from 'react';
import * as _ from 'lodash';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { SelectField, MenuItem, RaisedButton } from 'material-ui';
import GithubIcon from '../components/common/githubIcon';

import * as BranchActions from './branchActions';

interface IBranchSelectorProps {
    branches: string[];
    currentBranch: string;
    actions: any;
}

class BranchSelector extends React.Component<IBranchSelectorProps, null> {
    constructor(props, context) {
        super(props, context);

        this.selectBranch = this.selectBranch.bind(this);
    }
    private selectBranch(event, index, branch) {
        this.props.actions.setBranch(branch);
    }
    public render(): JSX.Element {
        return (<SelectField
            floatingLabelText="Branch"
            value={this.props.currentBranch}
            onChange={this.selectBranch}
        >
            {_.map(this.props.branches, (branch: any) => {
                return <MenuItem key={branch.name} value={branch.name} primaryText={branch.name} />;
            })}
        </SelectField>);
    }
}

const mapStateToProps = (state, ownProps) => {
    return {
        branches: state.branches,
        currentBranch: state.currentbranch
    };
};
const mapDispatchToProps = (dispatch) => {
    return ({
        actions: bindActionCreators(BranchActions, dispatch)
    });
};
export default connect(mapStateToProps, mapDispatchToProps)(BranchSelector);
