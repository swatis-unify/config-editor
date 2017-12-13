import * as React from 'react';
import * as _ from 'lodash';

import ConcatenatedFieldRow from './concatenatedFieldRow';

interface IConcatenatedField {
    fields: string[];
    target_field: string;
    delimiter: string;
}

interface IConcatenatedFieldProps {
    method: string;
    params: IConcatenatedField;
}

interface IFilterProps {
    params?: IConcatenatedFieldProps[];
    onSave: (params: any) => void;
    fields: string[];
}

export default class ConcatenatedField extends React.Component<IFilterProps, null> {
    constructor(props, context) {
        super(props, context);

        this.onSave = this.onSave.bind(this);
    }
    private onSave(index, param) {
        const params: IConcatenatedFieldProps[] = _.assign([], this.props.params);
        params[index] = _.assign(params[index], { params: param });

        this.props.onSave(params);
    }
    public render(): JSX.Element {
        return (<div>
            {_.map(this.props.params, (param, index) => {
                return <ConcatenatedFieldRow key={index} rowId={index} options={this.props.fields} onSave={this.onSave} {...param.params} />;
            })}
        </div>);
    }
}
