import * as React from 'react';

import { Card, CardHeader, CardText } from 'material-ui';

interface IFilterProps {
    params?: any;
}

interface IFIlterState {
    expanded: boolean;
}

export default class CommonFilter extends React.Component<IFilterProps, IFIlterState> {
    private filterName: string;
    constructor(props, context) {
        super(props, context);

        this.filterName = 'get_configurations';
        this.state = { expanded: false };

        this.toggleExpansion = this.toggleExpansion.bind(this);
    }
    private toggleExpansion() {
        this.setState({ expanded: !this.state.expanded });
    }
    public render(): JSX.Element {
        return (<Card expanded={this.state.expanded} onExpandChange={this.toggleExpansion}>
            <CardHeader
                showExpandableButton={true}
                actAsExpander={true}
                title="Configuration"
            />
            <CardText expandable={true}>
                <div>Show Edit configuration form</div>
            </CardText>
        </Card>);
    }
}
