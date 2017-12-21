import * as React from 'react';
import * as _ from 'lodash';

import { Card, CardHeader, CardText, TextField, RaisedButton, AutoComplete } from 'material-ui';
import style from './filterFormStyle';
interface IDefaultValueRowProps {
    title?: string;
    targetField?: string;
    value?: string;
    onSave: (string, any) => void;
    rowId?: string;
    expanded?: boolean;
    options: string[];
}

interface IDefaultValueRowState {
    expanded: boolean;
    targetField: string;
    value: string;
    errors: any;
}

export default class DefaultValueRow extends React.Component<IDefaultValueRowProps, IDefaultValueRowState> {
    constructor(props, context) {
        super(props, context);

        this.state = {
            expanded: false,
            targetField: this.props.targetField || '',
            value: this.props.value || '',
            errors: {}
        };

        this.toggleExpansion = this.toggleExpansion.bind(this);
        this.onTextChange = this.onTextChange.bind(this);
        this.updateInput = this.updateInput.bind(this);
        this.updateValue = this.updateValue.bind(this);
        this.getDefaultState = this.getDefaultState.bind(this);
        this.cancelUpdates = this.cancelUpdates.bind(this);
        this.updateFilter = this.updateFilter.bind(this);
    }
    private toggleExpansion() {
        this.setState({ expanded: !this.state.expanded });
    }
    private onTextChange(event, value) {
        const field = event.target.id;
        this.setState({ [field]: value });
    }
    private getOptions() {
        // format options
        return _.map(this.props.options, option => {
            return { text: `$${option}`, value: `$${option}` };
        });
    }
    private updateInput(value: string, dataSource: string[], params: any) {
        this.setState({ value });
    }
    private updateValue(field, index) {
        this.setState({ value: field.value });
    }
    private filterOptions(searchText, key) {
        return (key.toLowerCase().indexOf(searchText.toLowerCase()) !== -1);
    }
    private cancelUpdates() {
        this.setState(this.getDefaultState());
    }
    private updateFilter() {
        let { errors } = this.state;
        // validate fields
        const mandatoryFields = [
            'targetField',
            'value'
        ];

        // rest errors
        errors = {};
        _.forEach(mandatoryFields, (field) => {
            if (!this.state[field]) {
                errors[field] = 'required';
            } else if (field === 'value' && !_.includes(this.props.options, this.state.value.slice(1))) {
                errors[field] = 'invalid';
            }
        });

        if (_.values(errors).length > 0) {
            this.setState({ errors });
            return false;
        }

        this.setState({ errors });
        this.props.onSave(this.props.rowId, { targetField: this.state.targetField, value: this.state.value });
    }
    private getDefaultState() {
        return {
            targetField: this.props.targetField || '',
            value: this.props.value || '',
            errors: {}
        };
    }
    public render(): JSX.Element {
        return (<Card expanded={this.props.expanded || this.state.expanded} onExpandChange={this.toggleExpansion} style={style.card}>
            <CardHeader
                showExpandableButton={true}
                actAsExpander={true}
                title={this.props.title || this.props.targetField}
            />
            <CardText expandable={true}>
                <form>
                    <TextField
                        id="targetField"
                        fullWidth={true}
                        floatingLabelText="Target Field"
                        value={this.state.targetField}
                        errorText={this.state.errors.targetField}
                        onChange={this.onTextChange}
                    />

                    <AutoComplete
                        floatingLabelText="Default Value"
                        fullWidth={true}
                        searchText={this.state.value}
                        onUpdateInput={this.updateInput}
                        onNewRequest={this.updateValue}
                        dataSource={this.getOptions()}
                        filter={this.filterOptions}
                        dataSourceConfig={{ text: 'text', value: 'value' }}
                        openOnFocus={true}
                        errorText={this.state.errors.value}
                    />
                    <div style={style.buttonContainer}>
                        <RaisedButton label="Cancel" onClick={this.cancelUpdates} style={style.cancelButton} />
                        <RaisedButton label="Save" onClick={this.updateFilter} primary={true} />
                    </div>
                </form>
            </CardText>
        </Card>);
    }
}
