import * as React from 'react';
import * as _ from 'lodash';

import BROverwriteRow from './bROverwriteRow';

interface IFilterProps {
    params: any;
    onSave: (any) => void;
    fields: string[];
}

export default class BROverwrite extends React.Component<IFilterProps, null> {
    constructor(props, context) {
        super(props, context);

        this.onSave = this.onSave.bind(this);
    }
    private onSave(index, param) {
        let params = _.assign({}, this.props.params);
        params = _.omit(params, index);
        params[param.targetField] = param.rule;

        this.props.onSave(params);
    }
    public render(): JSX.Element {
        return (<div>
            {_.map(this.props.params, (rule: any, k: string) => {
                return (<div key={k}>
                    <BROverwriteRow options={this.props.fields} rowId={k} targetField={k} rule={rule} onSave={this.onSave} />
                </div>);
            })}
        </div>);
    }
}
