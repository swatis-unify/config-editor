import * as React from 'react';
import * as _ from 'lodash';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { withRouter } from 'react-router';

import {
    FilterRow,
    CommonFilter,
    SplitByFilter,
    PivotConfiguration,
    BROverwrite,
    SQLExpression,
    DefaultValue,
    ConcatenatedField
} from './filters';

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
    config: IConfig;
}

class PartnerConfigPage extends React.Component<IPartnerConfigProps, null> {
    private filters: any[];
    constructor(props, context) {
        super(props, context);

        this.filters = [{
            filterName: 'get_configurations',
            title: 'Common',
            component: CommonFilter
        }, {
            filterName: 'split_by_position',
            title: 'Split by Position',
            component: SplitByFilter
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
    }
    public onSave(filterName, params) {
        console.log('filter name: ', filterName);
        console.log('params: ', JSON.stringify(params));
    }
    public render(): JSX.Element {
        const config = this.props.config.config || { filters: [] };
        return (
            <div>
                {_.map(config.filters, (filter) => {
                    const filterComponent: any = _.find(this.filters, { filterName: filter.filter_name });
                    return (<div className="col-md-6">
                        {filterComponent && <FilterRow key={filter.filter_name} params={filter.params} onSave={this.onSave} {...filterComponent} />}
                    </div>);
                })}
            </div>
        );
    }
}

const mapStateToProps = (state, ownProps) => {
    return {
        config: state.currentConfig
    };
};
const mapDispatchToProps = (dispatch) => {
    return ({});
};
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(PartnerConfigPage));
