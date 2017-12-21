import * as React from 'react';
import * as _ from 'lodash';

import { Card, CardHeader, CardText, TextField, RaisedButton } from 'material-ui';
import style from './filterFormStyle';

interface ISplitByFilterRowState {
    expanded: boolean;
    name: string;
    start?: number;
    end?: number;
    errors: any;
}

interface ISplitByFilterRowProps {
    title?: string;
    name: string;
    start?: number;
    end?: number;
    onSave: (number, any) => void;
    rowId: number;
    expanded?: boolean;
}
export default class SplitByFilterRow extends React.Component<ISplitByFilterRowProps, ISplitByFilterRowState> {
    constructor(props, context) {
        super(props, context);

        this.toggleExpansion = this.toggleExpansion.bind(this);
        this.onTextChange = this.onTextChange.bind(this);
        this.updateFilter = this.updateFilter.bind(this);
        this.cancelUpdates = this.cancelUpdates.bind(this);

        this.state = {
            expanded: false,
            name: this.props.name,
            start: this.props.start,
            end: this.props.end,
            errors: {}
        };
    }
    private getDefaultState() {
        return {
            name: this.props.name,
            start: this.props.start,
            end: this.props.end,
            errors: {}
        };
    }
    private toggleExpansion() {
        this.setState({ expanded: !this.state.expanded });
    }
    private onTextChange(event, value) {
        const field = event.target.id;

        this.setState({ [field]: value });
    }
    private updateFilter() {
        let { errors } = this.state;
        // validate fields
        const mandatoryFields = [
            'name',
            'start',
            'end'
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
        this.props.onSave(this.props.rowId, { name: this.state.name, start: this.state.start, end: this.state.end });
    }
    private cancelUpdates() {
        this.setState(this.getDefaultState());
    }
    public render(): JSX.Element {
        return (<Card expanded={this.props.expanded || this.state.expanded} onExpandChange={this.toggleExpansion} style={style.card}>
            <CardHeader
                showExpandableButton={true}
                actAsExpander={true}
                title={this.props.title || this.props.name}
            />
            <CardText expandable={true}>
                <form>
                    <TextField
                        id="name"
                        fullWidth={true}
                        floatingLabelText="Name"
                        value={this.state.name}
                        errorText={this.state.errors.name}
                        onChange={this.onTextChange}
                    />

                    <div style={style.multiFieldContainer}>
                        <div style={style.multiFieldItem}>
                            <TextField
                                fullWidth={true}
                                id="start"
                                type="number"
                                min="0"
                                floatingLabelText="Start"
                                value={this.state.start}
                                errorText={this.state.errors.start}
                                onChange={this.onTextChange}
                            />
                        </div>

                        <div style={style.multiFieldItem}>
                            <TextField
                                fullWidth={true}
                                id="end"
                                type="number"
                                min="0"
                                floatingLabelText="End"
                                value={this.state.end}
                                errorText={this.state.errors.end}
                                onChange={this.onTextChange}
                            />
                        </div>
                    </div>
                    <div style={style.buttonContainer}>
                        <RaisedButton label="Cancel" onClick={this.cancelUpdates} style={style.cancelButton} />
                        <RaisedButton label="Save" onClick={this.updateFilter} primary={true} />
                    </div>
                </form>
            </CardText>
        </Card>);
    }
}
