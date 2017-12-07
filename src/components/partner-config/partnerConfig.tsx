import * as React from 'react';
import * as _ from 'lodash';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { withRouter } from 'react-router';

interface IFilter {
    filter_name: string;
    params: any;
}
interface IConfig {
    fileName?: string;
    config: {
        filters: IFilter[];
    };
}
interface IPartnerConfigProps {
    config: IConfig;
}

class PartnerConfigPage extends React.Component<IPartnerConfigProps, null> {
    public render(): JSX.Element {
        const config = this.props.config.config || { filters: [] };
        return (
            <div>
                {_.map(config.filters, (filter) => {
                    return <div>{filter.filter_name}</div>;
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
