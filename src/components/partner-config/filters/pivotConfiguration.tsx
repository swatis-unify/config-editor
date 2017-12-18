import * as React from 'react';
import * as _ from 'lodash';

import PivotConfigurationRow from './pivotConfigurationRow';

interface IPivotConfig {
    table_name: string;
    field_mapping: any[];
}

interface IFilterProps {
    params: IPivotConfig[];
    onSave: (any) => void;
    fields: string[];
}

export default class PivotConfiguration extends React.Component<IFilterProps, null> {
    constructor(props, context) {
        super(props, context);

        this.onSave = this.onSave.bind(this);
    }
    private onSave(index, param) {
        console.log('index: ', index);
        console.log('Params ', param);
        // let params = _.assign({}, this.props.params);
        // params = _.omit(params, index);
        // params[param.targetField] = param.value;

        // this.props.onSave(params);
    }
    public render(): JSX.Element {
        return (<div>
            {_.map(this.props.params, (config: IPivotConfig, index: number) => {
                return (<div key={index}>
                    <PivotConfigurationRow options={this.props.fields} rowId={index} onSave={this.onSave} {...config} />
                </div>);
            })}
        </div>);
    }
}
