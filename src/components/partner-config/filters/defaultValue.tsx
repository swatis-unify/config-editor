import * as React from 'react';
import * as _ from 'lodash';

import DefaultValueRow from './defaultValueRow';

interface IFilterProps {
    params: any;
    onSave: (params: any) => void;
    fields: string[];
}

export default class DefaultValue extends React.Component<IFilterProps, null> {
    constructor(props, context) {
        super(props, context);

        this.onSave = this.onSave.bind(this);
    }
    private onSave(index, param) {
        let params = _.assign({}, this.props.params);
        params = _.omit(params, index);
        params[param.targetField] = param.value;

        this.props.onSave(params);
    }
    public render(): JSX.Element {
        return (<div>
            {_.map(this.props.params, (value: string, k: string) => {
                return (<div key={k}>
                    <DefaultValueRow options={this.props.fields} rowId={k} targetField={k} value={value} onSave={this.onSave} />
                </div>);
            })}
        </div>);
    }
}
