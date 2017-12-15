import * as React from 'react';
import * as _ from 'lodash';

import { Card, CardHeader, CardText, TextField, RaisedButton, Chip, AutoComplete } from 'material-ui';

interface IBROverwriteRowProps {
    title?: string;
    targetField?: string;
    rule?: any;
    onSave: (string, any) => void;
    rowId?: string;
    expanded?: boolean;
    options: string[];
}

interface IBROverwriteRowState {
    expanded: boolean;
    targetField: string;
    columns: string[];
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

export default class BROverwriteRow extends React.Component<IBROverwriteRowProps, IBROverwriteRowState> {
    constructor(props, context) {
        super(props, context);

        this.state = {
            expanded: false,
            targetField: this.props.targetField || '',
            columns: _.assign([], (this.props.rule || {}).columns || []),
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
    private onTextChange(event, value) {
        const field = event.target.id;
        this.setState({ [field]: value });
    }
    private cancelUpdates() {
        this.setState(this.getDefaultState());
    }
    private updateFilter() {
        let { errors } = this.state;
        // validate fields
        const mandatoryFields = [
            'targetField',
            'columns'
        ];

        // rest errors
        errors = {};
        _.forEach(mandatoryFields, (field) => {
            if (!this.state[field]) {
                errors[field] = 'required';
            } else if (field === 'columns' && !(this.state.columns.length > 0)) {
                errors[field] = 'required';
            }
        });

        if (_.values(errors).length > 0) {
            this.setState({ errors });
            return false;
        }

        this.setState({ errors });
        this.props.onSave(this.props.rowId, { targetField: this.state.targetField, rule: _.assign({}, this.props.rule, { columns: this.state.columns }) });
    }
    private getDefaultState() {
        return {
            targetField: this.props.targetField || '',
            columns: _.assign([], (this.props.rule || {}).columns || []),
            errors: {},
            searchText: ''
        };
    }
    private filterOptions(searchText, key) {
        return (key.toLowerCase().indexOf(searchText.toLowerCase()) !== -1);
    }
    private removeField(column) {
        const { columns } = this.state;
        const index = _.indexOf(columns, column);
        if (index >= 0) {
            columns.splice(index, 1);
        }

        this.setState({ columns });
    }
    private getOptions() {
        let { options } = this.props;
        // remove options they are already present from auto complete list
        options = _.filter(options, (option) => {
            return !_.includes(this.state.columns, `$${option}`);
        });

        // format options
        return _.map(options, option => {
            return { text: option, value: `$${option}` };
        });
    }
    private updateInput(searchText: string, dataSource: string[], params: any) {
        this.setState({ searchText });
    }
    private addNew(column, index) {
        const { columns } = this.state;
        if (!_.includes(columns, column.value)) {
            columns.push(column.value);
        }

        this.setState({ searchText: '', columns });
    }
    public render(): JSX.Element {
        return (<Card expanded={this.props.expanded || this.state.expanded} onExpandChange={this.toggleExpansion} style={{ margin: '10px 0' }}>
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
                        floatingLabelText="Columns"
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
                        errorText={this.state.errors.columns}
                    />
                    <div className="columns-container">
                        {_.map(this.state.columns, (field) => {
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