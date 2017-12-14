import * as React from 'react';
import * as _ from 'lodash';

import SQLExpressionRow from './SQLExpressionRow';

interface ISqlExpression {
    targetfieldname: string;
    expr: string;
}
interface IFilterProps {
    params: ISqlExpression[];
    onSave: (any) => void;
}

export default class SQLExpression extends React.Component<IFilterProps, null> {
    constructor(props, context) {
        super(props, context);

        this.onSave = this.onSave.bind(this);
    }
    private onSave(index, param) {
        const params = _.assign([], this.props.params);
        params[index] = param;

        this.props.onSave(params);
    }
    public render(): JSX.Element {
        return (<div>
            {_.map(this.props.params, (param, index) => {
                return (<div key={index}>
                    <SQLExpressionRow rowId={index} key={index} onSave={this.onSave} {...param} />
                </div>);
            })}
        </div>);
    }
}
