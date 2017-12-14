import * as React from 'react';
import * as _ from 'lodash';

import { Card, CardHeader, CardText, TextField, RaisedButton } from 'material-ui';

interface ISQLExpressionRowProps {
    title?: string;
    targetfieldname: string;
    expr?: string;
    onSave: (number, any) => void;
    rowId: number;
    expanded?: boolean;
}

interface ISQLExpressionRowState {
    expanded: boolean;
    targetfieldname: string;
    expr: string;
    errors: any;
}

const submitButtonsStyle: React.CSSProperties = {
    display: 'flex',
    justifyContent: 'flex-end'
};

export default class SQLExpressionRow extends React.Component<ISQLExpressionRowProps, ISQLExpressionRowState> {
    constructor(props, context) {
        super(props, context);

        this.state = {
            expanded: false,
            targetfieldname: this.props.targetfieldname || '',
            expr: this.props.expr || '',
            errors: {}
        };
        this.toggleExpansion = this.toggleExpansion.bind(this);
        this.getDefaultState = this.getDefaultState.bind(this);
        this.onTextChange = this.onTextChange.bind(this);
        this.cancelUpdates = this.cancelUpdates.bind(this);
        this.updateFilter = this.updateFilter.bind(this);
    }
    private toggleExpansion() {
        this.setState({ expanded: !this.state.expanded });
    }
    private getDefaultState() {
        return {
            targetfieldname: this.props.targetfieldname || '',
            expr: this.props.expr || '',
            errors: {}
        };
    }
    private onTextChange(event, value) {
        const field = event.target.id;

        this.setState({ [field]: value });
    }
    private updateFilter() {
        let { errors } = this.state;
        // validate fields
        const mandatoryFields = [
            'targetfieldname',
            'expr'
        ];

        // rest errors
        errors = {};
        _.forEach(mandatoryFields, (field) => {
            if (!this.state[field]) {
                errors[field] = 'required';
            }
        });

        if (_.values(errors).length > 0) {
            this.setState({ errors });
            return false;
        }

        this.setState({ errors });
        this.props.onSave(this.props.rowId, { expr: this.state.expr, targetfieldname: this.state.targetfieldname });
    }
    private cancelUpdates() {
        this.setState(this.getDefaultState());
    }
    public render(): JSX.Element {
        return (<Card expanded={this.props.expanded || this.state.expanded} onExpandChange={this.toggleExpansion} style={{ margin: '10px 0' }}>
            <CardHeader
                showExpandableButton={true}
                actAsExpander={true}
                title={this.props.title || this.props.targetfieldname}
            />
            <CardText expandable={true}>
                <form>
                    <TextField
                        id="targetfieldname"
                        fullWidth={true}
                        floatingLabelText="Target Field"
                        value={this.state.targetfieldname}
                        errorText={this.state.errors.targetfieldname}
                        onChange={this.onTextChange}
                    />

                    <TextField
                        id="expr"
                        fullWidth={true}
                        multiLine={true}
                        floatingLabelText="Expression"
                        value={this.state.expr}
                        errorText={this.state.errors.expr}
                        onChange={this.onTextChange}
                    />

                    <div style={submitButtonsStyle}>
                        <RaisedButton label="Cancel" onClick={this.cancelUpdates} style={{ marginRight: 10 }} />
                        <RaisedButton label="Save" onClick={this.updateFilter} primary={true} />
                    </div>
                </form>
            </CardText>
        </Card>);
    }
}
