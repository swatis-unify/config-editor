import * as React from 'react';
import * as _ from 'lodash';

import { Card, CardHeader, CardText, TextField, RaisedButton, AutoComplete, Divider } from 'material-ui';
import style from './filterFormStyle';
interface IConfigRowProps {
    targetField: string;
    value: string;
    options: string[];
}

interface IConfigRowState {
    targetField: string;
    value: string;
    errors: any;
}

class ConfigRow extends React.Component<IConfigRowProps, IConfigRowState> {
    constructor(props, context) {
        super(props, context);

        this.state = {
            targetField: this.props.targetField || '',
            value: this.props.value || '',
            errors: {}
        };
        this.updateInput = this.updateInput.bind(this);
        this.updateValue = this.updateValue.bind(this);
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
    private onTextChange(event, value) {
        const field = event.target.id;
        this.setState({ [field]: value });
    }
    public render(): JSX.Element {
        return (<div style={style.multiFieldContainer}>
            <div style={style.multiFieldItem}>
                <TextField
                    id="targetField"
                    fullWidth={true}
                    floatingLabelText="Target"
                    value={this.state.targetField}
                    errorText={this.state.errors.targetField}
                    onChange={this.onTextChange}
                />
            </div>
            <div style={style.multiFieldItem}>
                <AutoComplete
                    fullWidth={true}
                    floatingLabelText="Value"
                    searchText={this.state.value}
                    onUpdateInput={this.updateInput}
                    onNewRequest={this.updateValue}
                    dataSource={this.getOptions()}
                    filter={this.filterOptions}
                    dataSourceConfig={{ text: 'text', value: 'value' }}
                    openOnFocus={true}
                    errorText={this.state.errors.value}
                />
            </div>
        </div>);
    }
}
interface IPivotConfigurationRowProps {
    title?: string;
    table_name: string;
    field_mapping: any[];
    onSave: (number, any) => void;
    rowId: number;
    expanded?: boolean;
    options: string[];
}

interface IPivotConfigurationRowState {
    expanded: boolean;
    table_name: string;
    field_mapping: any[];
    errors: any;
}

const dividerStyle: React.CSSProperties = { margin: '5px 0', height: 2 };

export default class PivotConfigurationRow extends React.Component<IPivotConfigurationRowProps, IPivotConfigurationRowState> {
    constructor(props, context) {
        super(props, context);

        this.state = {
            expanded: false,
            table_name: this.props.table_name || '',
            field_mapping: this.props.field_mapping || [],
            errors: {}
        };
        this.toggleExpansion = this.toggleExpansion.bind(this);
        // this.getDefaultState = this.getDefaultState.bind(this);
        this.onTextChange = this.onTextChange.bind(this);
        // this.cancelUpdates = this.cancelUpdates.bind(this);
        // this.updateFilter = this.updateFilter.bind(this);
    }
    private onTextChange(event, value) {
        const field = event.target.id;

        this.setState({ [field]: value });
    }
    private toggleExpansion() {
        this.setState({ expanded: !this.state.expanded });
    }
    public render(): JSX.Element {
        console.log(this.props.field_mapping);
        return (<Card expanded={this.props.expanded || this.state.expanded} onExpandChange={this.toggleExpansion} style={style.card}>
            <CardHeader
                showExpandableButton={true}
                actAsExpander={true}
                title={this.props.title || this.props.table_name}
            />
            <CardText expandable={true}>
                <form>
                    <TextField
                        id="table_name"
                        fullWidth={true}
                        floatingLabelText="Table Name"
                        value={this.state.table_name}
                        errorText={this.state.errors.table_name}
                        onChange={this.onTextChange}
                    />

                    <div className="mappings-container">
                        {_.map(this.props.field_mapping, (mapping, i) => {
                            return (<div key={i}>
                                <Divider style={dividerStyle} />
                                {_.map(mapping, (value: string, targetField: string) => {
                                    return <ConfigRow key={targetField} value={value} targetField={targetField} options={this.props.options} />;
                                })}
                            </div>);
                        })}
                    </div>
                </form>
            </CardText>
        </Card>);
    }
}
