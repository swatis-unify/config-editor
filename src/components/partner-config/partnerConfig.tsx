import * as React from 'react';
import * as _ from 'lodash';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { withRouter } from 'react-router';

import { RaisedButton, IconMenu, MenuItem } from 'material-ui';

import * as contentActions from '../../actions/contentActions';

import {
    FilterRow,
    CommonFilter,
    SplitByFilter,
    SplitByFilterRow,
    PivotConfiguration,
    BROverwrite,
    SQLExpression,
    DefaultValue,
    ConcatenatedField
} from './filters';

import AddFilterRow from './addFilterRow';

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

class PartnerConfigPage extends React.Component<IPartnerConfigProps, { selectedFilter: string }> {
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
            component: BROverwrite
        }, {
            filterName: 'sql_expression',
            title: 'SQL Expression',
            component: SQLExpression
        }, {
            filterName: 'default_value',
            title: 'Default Value',
            component: DefaultValue
        }, {
            filterName: 'multiparam',
            title: 'Concatenated Field',
            component: ConcatenatedField
        }];

        this.state = { selectedFilter: '' };

        this.onSave = this.onSave.bind(this);
        this.onSaveNew = this.onSaveNew.bind(this);
        this.onAddFilter = this.onAddFilter.bind(this);
        this.pushConfig = this.pushConfig.bind(this);
        this.getNewFilterForm = this.getNewFilterForm.bind(this);
    }
    private pushConfig() {
        this.props.actions.pushConfig(this.props.branch, this.props.config);
    }
    public onSave(filterName, params) {
        const filter = { filter_name: filterName, params };
        this.props.actions.updateFilter(filter);
    }
    private onAddFilter(event, value) {
        this.setState({ selectedFilter: value });
    }
    private constructParams(filterName, field) {
        switch (filterName) {
            case 'split_by_position':
                return { filter_name: filterName, params: { fields: [field] } };
            default:
                return { filter_name: filterName, params: {} };
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
        }

        this.setState({ selectedFilter: '' });
    }
    private getNewFilterForm(): JSX.Element {
        const filterComponent: any = _.find(this.filters, { filterName: this.state.selectedFilter });
        return (<div style={{ width: '50%' }}>
            {filterComponent && <AddFilterRow key={this.state.selectedFilter} onSave={this.onSaveNew} {...filterComponent} />}
        </div>);
    }
    public render(): JSX.Element {
        const config = this.props.config.config || { filters: [] };
        return (
            <div>
                <div className="col-md-12">
                    <IconMenu
                        iconButtonElement={<RaisedButton label="Add" icon={<i className="fas fa-plus" />} />}
                        onChange={this.onAddFilter}
                        value={this.state.selectedFilter}
                    >
                        {_.map(_.filter(this.filters, (f) => !f.static), (filter: any) => {
                            return <MenuItem value={filter.filterName} primaryText={filter.title} />;
                        })}
                    </IconMenu>
                </div>
                {this.state.selectedFilter && <div className="col-md-12">{this.getNewFilterForm()}</div>}
                <div style={{ display: 'flex', justifyContent: 'flex-start', width: '100%', flexDirection: 'row', flexWrap: 'wrap' }}>
                    {_.map(config.filters, (filter) => {
                        const filterComponent: any = _.find(this.filters, { filterName: filter.filter_name });
                        return (<div className="col-md-6">
                            {filterComponent && <FilterRow key={filter.filter_name} params={filter.params} onSave={this.onSave} {...filterComponent} />}
                        </div>);
                    })}
                </div>

                <div className="submit-buttons col-md-12 text-center" style={{ margin: '10px 0' }}>
                    <RaisedButton label="Save" primary={true} onClick={this.pushConfig} style={{ margin: '0 5px' }} />
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
