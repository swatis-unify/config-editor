import * as React from 'react';
import * as _ from 'lodash';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { withRouter } from 'react-router';

import { RaisedButton, IconMenu, MenuItem, Dialog, TextField, FlatButton, Snackbar } from 'material-ui';

import * as contentActions from '../../actions/contentActions';
import {
    FilterRow,
    CommonFilter,
    SplitByFilter,
    SplitByFilterRow,
    PivotConfiguration,
    BROverwrite,
    BROverwriteRow,
    SQLExpression,
    SQLExpressionRow,
    DefaultValue,
    DefaultValueRow,
    ConcatenatedField,
    ConcatenatedFieldRow
} from './filters';
import AddFilterRow from './addFilterRow';
import FileRenameDialog from './fileRenameDialog';
import './filters/filterForm.css';

interface IFilter {
    filter_name: string;
    params: any;
}
interface IConfig {
    path: string;
    sha: string;
    config: {
        filters: IFilter[];
    };
}
interface IPartnerConfigProps {
    branch: string;
    config: IConfig;
    actions: any;
}

interface IPartnerConfigState {
    selectedFilter: string;
    showDialog: boolean;
    showSnackbar: boolean;
    submitInProgress: boolean;
}

class PartnerConfigPage extends React.Component<IPartnerConfigProps, IPartnerConfigState> {
    private filters: any[];
    constructor(props, context) {
        super(props, context);

        this.filters = [{
            filterName: 'get_configurations',
            title: 'Common',
            component: CommonFilter,
            static: true
        }, {
            filterName: 'split_by_position',
            title: 'Split by Position',
            component: SplitByFilter,
            rowComponent: SplitByFilterRow
        }, {
            filterName: 'get_pivot_configurations',
            title: 'Pivot Configuration',
            component: PivotConfiguration
        }, {
            filterName: 'get_business_rule_configurations',
            title: 'BR Overwrite',
            component: BROverwrite,
            rowComponent: BROverwriteRow
        }, {
            filterName: 'sql_expression',
            title: 'SQL Expression',
            component: SQLExpression,
            rowComponent: SQLExpressionRow
        }, {
            filterName: 'default_value',
            title: 'Default Value',
            component: DefaultValue,
            rowComponent: DefaultValueRow
        }, {
            filterName: 'multiparam',
            title: 'Concatenated Field',
            component: ConcatenatedField,
            rowComponent: ConcatenatedFieldRow
        }];

        this.state = { selectedFilter: '', showDialog: false, showSnackbar: false, submitInProgress: false };

        this.onSave = this.onSave.bind(this);
        this.onSaveNew = this.onSaveNew.bind(this);
        this.onAddFilter = this.onAddFilter.bind(this);
        this.pushConfig = this.pushConfig.bind(this);
        this.getNewFilterForm = this.getNewFilterForm.bind(this);
        this.cancelDialog = this.cancelDialog.bind(this);
        this.submitDialog = this.submitDialog.bind(this);
        this.hideSnackbar = this.hideSnackbar.bind(this);
    }
    public componentWillMount() {
        // Enable page reload. Fetch configs when page is reloaded.
        if (!this.props.config.sha) {
            const { search } = window.location;
            const params = new URLSearchParams(search);

            const path = params.get('path');
            const branch = params.get('branch');

            if (path && branch) {
                this.props.actions.setBranch(branch);
                this.props.actions.fetchConfig({ path }, branch);
            }
        }
    }
    private cancelDialog() {
        this.setState({ showDialog: false });
    }
    private submitDialog(fileName) {
        this.setState({ showDialog: false, submitInProgress: true });
        this.props.actions.createConfig(fileName, this.props.branch, this.props.config).then(() => {
            this.setState({ submitInProgress: false, showSnackbar: true });
        });
    }
    private pushConfig() {
        const { search } = window.location;
        const params = new URLSearchParams(search);

        const copyAsNew = params.get('copyasnew');
        if (copyAsNew) {
            this.setState({ showDialog: true });
        } else {
            this.setState({ submitInProgress: true });
            this.props.actions.pushConfig(this.props.branch, this.props.config).then(() => {
                this.setState({ showSnackbar: true, submitInProgress: false });
            });
        }
    }
    public onSave(filterName, params) {
        const filter = { filter_name: filterName, params };
        this.props.actions.updateFilter(filter);
    }
    private onAddFilter(event, value) {
        this.setState({ selectedFilter: value });
    }
    private constructParams(filterName, field) {
        const param: any = {};
        switch (filterName) {
            case 'split_by_position':
                return { filter_name: filterName, params: { fields: [field] } };
            case 'multiparam':
                return { filter_name: filterName, params: [{ method: "get_concatenated_field", params: { target_field: '' } }] };
            case 'sql_expression':
                return { filter_name: filterName, params: [field] };
            case 'default_value':
                param[field.targetField] = field.value;
                return { filter_name: filterName, params: param };
            case 'get_business_rule_configurations':
                param[field.targetField] = field.rule;
                return { filter_name: filterName, params: param };
            default:
                return { filter_name: filterName, params: field };
        }
    }
    public onSaveNew(filterName, field) {
        const config = this.props.config.config || { filters: [] };
        const filter: IFilter = _.find(config.filters, { filter_name: filterName }) ? _.assign({}, _.find(config.filters, { filter_name: filterName })) : { filter_name: '', params: {} };
        if (!filter.filter_name) {
            this.props.actions.addFilter(this.constructParams(filterName, field));
        } else if (filter.filter_name === 'split_by_position') {
            filter.params.fields.push(field);
            this.props.actions.updateFilter(filter);
        } else if (filter.filter_name === 'multiparam') {
            filter.params.push({ method: "get_concatenated_field", params: field });
            this.props.actions.updateFilter(filter);
        } else if (filter.filter_name === 'default_value') {
            filter.params[field.targetField] = field.value;
            this.props.actions.updateFilter(filter);
        } else if (filter.filter_name === 'get_business_rule_configurations') {
            filter.params[field.targetField] = field.rule;
            this.props.actions.updateFilter(filter);
        } else {
            filter.params.push(field);
            this.props.actions.updateFilter(filter);
        }

        this.setState({ selectedFilter: '' });
    }
    private getNewFilterForm(): JSX.Element {
        const filterComponent: any = _.find(this.filters, { filterName: this.state.selectedFilter });
        return (<div style={{ width: '50%' }}>
            {filterComponent && <AddFilterRow key={this.state.selectedFilter} fields={this.getAutoCompleteOptions(this.state.selectedFilter)} onSave={this.onSaveNew} {...filterComponent} />}
        </div>);
    }
    private getAutoCompleteOptions(filterName) {
        const config = this.props.config.config || { filters: [] };
        if (filterName === 'split_by_position') {
            return [];
        }

        const filter = _.find(config.filters, { filter_name: 'split_by_position' });
        return (filter ? _.map(filter.params.fields, 'name') : []);
    }
    private hideSnackbar() {
        this.setState({ showSnackbar: false });
    }
    public render(): JSX.Element {
        const config = this.props.config.config || { filters: [] };
        return (
            <div id="partner-config">
                <div className="col-md-12">
                    <IconMenu
                        iconButtonElement={<RaisedButton label="Add" icon={<i className="fas fa-plus" />} />}
                        onChange={this.onAddFilter}
                        value={this.state.selectedFilter}
                    >
                        {_.map(_.filter(this.filters, (f) => !f.static), (filter: any) => {
                            return <MenuItem key={filter.filterName} value={filter.filterName} primaryText={filter.title} />;
                        })}
                    </IconMenu>
                </div>
                {this.state.selectedFilter && <div className="col-md-12">{this.getNewFilterForm()}</div>}
                <div style={{ display: 'flex', justifyContent: 'flex-start', width: '100%', flexDirection: 'row', flexWrap: 'wrap' }}>
                    {_.map(config.filters, (filter) => {
                        const filterComponent: any = _.find(this.filters, { filterName: filter.filter_name });
                        return (<div style={{ flexBasis: '48%', margin: '10px' }} key={filter.filter_name}>
                            {filterComponent && <FilterRow key={filter.filter_name} fields={this.getAutoCompleteOptions(filter.filter_name)} params={filter.params} onSave={this.onSave} {...filterComponent} />}
                        </div>);
                    })}
                </div>

                <FileRenameDialog isOpen={this.state.showDialog} onCancel={this.cancelDialog} onSave={this.submitDialog} />
                <Snackbar
                    open={this.state.showSnackbar}
                    message="Checked in config"
                    autoHideDuration={4000}
                    onRequestClose={this.hideSnackbar}
                />
                <div className="submit-buttons col-md-12 text-center" style={{ margin: '10px 0' }}>
                    <RaisedButton label={this.state.submitInProgress ? "Saving..." : "Save"} primary={true} onClick={this.pushConfig} style={{ margin: '0 5px' }} />
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state, ownProps) => {
    return {
        config: state.currentConfig,
        branch: state.currentBranch
    };
};
const mapDispatchToProps = (dispatch) => {
    return ({
        actions: bindActionCreators(contentActions, dispatch)
    });
};
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(PartnerConfigPage));
