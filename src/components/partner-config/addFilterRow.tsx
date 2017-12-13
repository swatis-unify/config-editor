import * as React from 'react';

import { Card, CardHeader, CardText } from 'material-ui';

interface IFilterProps {
    filterName: string;
    title: string;
    subtitle?: string;
    component: any;
    rowComponent?: any;
    params?: any;
    onSave: (filerName: string, params: any) => void;
    fields: string[];
}

interface IFilterState {
    expanded: boolean;
}

export default class AddFilterRow extends React.Component<IFilterProps, IFilterState> {
    constructor(props, context) {
        super(props, context);

        this.state = { expanded: true };

        this.onSave = this.onSave.bind(this);
        this.getOrBuildParams = this.getOrBuildParams.bind(this);
    }
    private onSave(i, row) {
        console.log('row: ', row);
        this.props.onSave(this.props.filterName, row);
    }
    private getOrBuildParams() {
        if (this.props.params) {
            return this.props.params;
        } else {
            // for new form build params
            switch (this.props.filterName) {
                case 'split_by_position':
                    return { fields: [{ name: '' }] };

                default:
                    return {};
            }
        }
    }
    public render(): JSX.Element {
        return (<div>
            {<this.props.rowComponent options={this.props.fields} title={this.props.title} expanded={true} onSave={this.onSave} params={this.getOrBuildParams()} />}
        </div>);
    }
}
