import * as React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import * as ConfigActions from './configActions';
import { IConfig } from './config';
import ConfigsList from './configsList';

import {
    Table,
    TableHeader,
    TableHeaderColumn,
    TableBody,
    TableRow,
    TableRowColumn,
    IconButton,
    RaisedButton
} from 'material-ui';

interface IConfigContainerProps {
    branch: string;
    configs: IConfig[];
    actions: any;
}
class ConfigsContainer extends React.Component<IConfigContainerProps, null> {
    public componentWillReceiveProps(nextProps) {
        if (nextProps.branch && !(this.props.configs.length > 0)) {
            this.props.actions.fetchConfigs(nextProps.branch);
        }
    }
    private onEdit(config) {
        console.log('edit config', config);
    }
    private copyAsNew(config) {
        console.log('copy as new config', config);
    }
    public render(): JSX.Element {
        // Notes - swati
        // Only Configs container is a connected component.
        // Actions has to be performed from container only
        return (<div>
            <ConfigsList onEdit={this.onEdit} onCopyAsNew={this.copyAsNew} configs={this.props.configs} />
        </div>);
    }
}

const mapStateToProps = (state, ownProps) => {
    return {
        branch: state.currentBranch,
        configs: state.configs
    };
};
const mapDispatchToProps = (dispatch) => {
    return ({
        actions: bindActionCreators(ConfigActions, dispatch)
    });
};
export default connect(mapStateToProps, mapDispatchToProps)(ConfigsContainer);
