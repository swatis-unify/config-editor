import * as React from 'react';
import * as _ from 'lodash';

import { Card, CardHeader, CardText, TextField, RaisedButton, Chip, AutoComplete } from 'material-ui';

interface IConcatenatedFieldRowProps {
    title?: string;
    fields?: string[];
    target_field: string;
    delimiter?: string;
    onSave: (number, any) => void;
    rowId: number;
    expanded?: boolean;
    options: string[];
}

interface IConcatenatedFieldRowState {
    expanded: boolean;
    target_field: string;
    delimiter: string;
    fields: string[];
    errors: any;
    searchText: string;
}

const chipStyle: React.CSSProperties = {
    display: 'inline-block',
    margin: 5
};

const chipLabelStyle: React.CSSProperties = {
    position: 'relative',
    bottom: 4
};

const chipDeleteIconStyle: React.CSSProperties = {
    position: 'relative',
    bottom: -4
};

const submitButtonsStyle: React.CSSProperties = {
    display: 'flex',
    justifyContent: 'flex-end'
};

export default class ConcatenatedFieldRow extends React.Component<IConcatenatedFieldRowProps, IConcatenatedFieldRowState> {
    constructor(props, context) {
        super(props, context);

        this.state = {
            expanded: false,
            target_field: this.props.target_field || '',
            delimiter: this.props.delimiter || '',
            fields: _.assign([], this.props.fields || []),
            errors: {},
            searchText: ''
        };

        this.toggleExpansion = this.toggleExpansion.bind(this);
        this.onTextChange = this.onTextChange.bind(this);
        this.updateInput = this.updateInput.bind(this);
        this.addNew = this.addNew.bind(this);
        this.getDefaultState = this.getDefaultState.bind(this);
        this.cancelUpdates = this.cancelUpdates.bind(this);
        this.updateFilter = this.updateFilter.bind(this);
    }
    private toggleExpansion() {
        this.setState({ expanded: !this.state.expanded });
    }
    private getDefaultState() {
        return {
            target_field: this.props.target_field || '',
            delimiter: this.props.delimiter || '',
            fields: _.assign([], this.props.fields || []),
            errors: {},
            searchText: ''
        };
    }
    private onTextChange(event, value) {
        const field = event.target.id;
        this.setState({ [field]: value });
    }
    private getOptions() {
        let { options } = this.props;
        // remove options they are already present from auto complete list
        options = _.filter(options, (option) => {
            return !_.includes(this.state.fields, `$${option}`);
        });

        // format options
        return _.map(options, option => {
            return { text: option, value: `$${option}` };
        });
    }
    private updateInput(searchText: string, dataSource: string[], params: any) {
        this.setState({ searchText });
    }
    private addNew(field, index) {
        const { fields } = this.state;
        if (!_.includes(fields, field.value)) {
            fields.push(field.value);
        }

        this.setState({ searchText: '', fields });
    }
    private removeField(field) {
        const { fields } = this.state;
        const index = _.indexOf(fields, field);
        if (index >= 0) {
            fields.splice(index, 1);
        }

        this.setState({ fields });
    }
    private cancelUpdates() {
        this.setState(this.getDefaultState());
    }
    private updateFilter() {
        let { errors } = this.state;
        // validate fields
        const mandatoryFields = [
            'target_field',
            'delimiter',
            'fields'
        ];

        // rest errors
        errors = {};
        _.forEach(mandatoryFields, (field) => {
            if (field === 'fields') {
                if (this.state.fields.length < 1) {
                    errors[field] = 'required';
                }
            } else if (!this.state[field]) {
                errors[field] = 'required';
            }
        });

        if (_.values(errors).length > 0) {
            this.setState({ errors });
            return false;
        }

        this.setState({ errors });
        this.props.onSave(this.props.rowId, { target_field: this.state.target_field, delimiter: this.state.delimiter, fields: this.state.fields });
    }
    private filterOptions(searchText, key) {
        return (key.toLowerCase().indexOf(searchText.toLowerCase()) !== -1);
    }
    public render(): JSX.Element {
        return (<Card expanded={this.props.expanded || this.state.expanded} onExpandChange={this.toggleExpansion} style={{ margin: '10px 0' }}>
            <CardHeader
                showExpandableButton={true}
                actAsExpander={true}
                title={this.props.title || this.props.target_field}
            />
            <CardText expandable={true}>
                <form>
                    <TextField
                        id="target_field"
                        fullWidth={true}
                        floatingLabelText="Target Field"
                        value={this.state.target_field}
                        errorText={this.state.errors.target_field}
                        onChange={this.onTextChange}
                    />

                    <TextField
                        id="delimiter"
                        fullWidth={true}
                        floatingLabelText="Delimiter"
                        value={this.state.delimiter}
                        errorText={this.state.errors.delimiter}
                        onChange={this.onTextChange}
                    />

                    <AutoComplete
                        floatingLabelText="Fields"
                        floatingLabelFixed={true}
                        fullWidth={true}
                        hintText="Add new"
                        searchText={this.state.searchText}
                        onUpdateInput={this.updateInput}
                        onNewRequest={this.addNew}
                        dataSource={this.getOptions()}
                        filter={this.filterOptions}
                        dataSourceConfig={{ text: 'text', value: 'value' }}
                        openOnFocus={true}
                        errorText={this.state.errors.fields}
                    />
                    <div className="fields-container">
                        {_.map(this.state.fields, (field) => {
                            return <Chip
                                key={field}
                                onRequestDelete={() => this.removeField(field)}
                                style={chipStyle}
                                labelStyle={chipLabelStyle}
                                deleteIconStyle={chipDeleteIconStyle}
                            >
                                {field}
                            </Chip>;
                        })}
                    </div>
                    <div style={submitButtonsStyle}>
                        <RaisedButton label="Cancel" onClick={this.cancelUpdates} style={{ marginRight: 10 }} />
                        <RaisedButton label="Save" onClick={this.updateFilter} primary={true} />
                    </div>
                </form>
            </CardText>
        </Card>);
    }
}
