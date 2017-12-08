import * as React from 'react';
import * as _ from 'lodash';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { withRouter } from 'react-router';

import { CommonFilter, SplitByFilter } from './filters';

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
    private filtersMap: any;
    constructor(props, context) {
        super(props, context);

        this.filtersMap = {
            get_configurations: <CommonFilter />,
            split_by_position: <SplitByFilter />
        };
    }
    public render(): JSX.Element {
        const config = this.props.config.config || { filters: [] };
        return (
            <div>
                {_.map(config.filters, (filter) => {
                    const filterComponent: JSX.Element = this.filtersMap[filter.filter_name];
                    return (<div className="col-md-6">
                        {filterComponent && filterComponent}
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
