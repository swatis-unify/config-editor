import * as React from 'react';

import { Card, CardHeader, CardText } from 'material-ui';

interface IFilterProps {
    filterName: string;
    title: string;
    subtitle?: string;
    component: any;
    params: any;
    onSave: (filerName: string, params: any) => void;
    fields: string[];
}

interface IFilterState {
    expanded: boolean;
}

const resizableCardStyle: React.CSSProperties = {
    resize: 'horizontal',
    overflow: 'auto',
    minWidth: '70%'
};

export default class FilterRow extends React.Component<IFilterProps, IFilterState> {
    constructor(props, context) {
        super(props, context);

        this.state = { expanded: false };

        this.toggleExpansion = this.toggleExpansion.bind(this);
        this.onSave = this.onSave.bind(this);
    }
    private toggleExpansion() {
        this.setState({ expanded: !this.state.expanded });
    }
    private onSave(params) {
        this.props.onSave(this.props.filterName, params);
    }
    public render(): JSX.Element {
        const cardStyle: React.CSSProperties = this.state.expanded ? resizableCardStyle : {};
        return (<Card expanded={this.state.expanded} onExpandChange={this.toggleExpansion} style={cardStyle}>
            <CardHeader
                showExpandableButton={true}
                actAsExpander={true}
                title={this.props.title}
                subtitle={this.props.subtitle}
            />
            <CardText expandable={true}>
                {<this.props.component onSave={this.onSave} params={this.props.params} fields={this.props.fields} />}
            </CardText>
        </Card>);
    }
}
