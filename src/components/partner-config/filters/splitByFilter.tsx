import * as React from 'react';
import * as _ from 'lodash';
import SplitByFilterRow from './splitByFilterRow';

interface IField {
    name: string;
    start?: number;
    end?: number;
}

interface IFilterProps {
    params?: { fields: IField[] };
    onSave: (any) => void;
}
export default class SplitByFilter extends React.Component<IFilterProps, null> {
    constructor(props, context) {
        super(props, context);

        this.onSave = this.onSave.bind(this);
    }
    public onSave(index: number, row: IField) {
        const fields: IField[] = _.assign([], this.props.params.fields);
        fields[index] = row;

        this.props.onSave({ fields });
    }
    public render(): JSX.Element {
        return (<div>
            {_.map(this.props.params.fields, (field, index) => {
                return <SplitByFilterRow key={index} rowId={index} onSave={this.onSave} {...field} />;
            })}
        </div>);
    }
}
