import * as React from 'react';
import * as _ from 'lodash';
import { TextField, SelectField, RadioButton, RadioButtonGroup, MenuItem, RaisedButton } from 'material-ui';
import style from './filterFormStyle';
interface ICommonFilterParam {
    common: { data_partner_name: string; feed_name: string };
    ignore_lines: { params: { header_row_count: number, trailer_row_count: number } };
    multiparam?: any;
}

interface IFilterProps {
    params?: ICommonFilterParam;
    onSave: (params: any) => void;
}

interface ICommonFilterState {
    data_partner_name: string;
    feed_name: string;
    header_row_count: number;
    trailer_row_count: number;
    fileType: string;
    errors: any;
}

export default class CommonFilter extends React.Component<IFilterProps, ICommonFilterState> {
    private fileTypes: string[];
    constructor(props, context) {
        super(props, context);

        this.getDefaultState = this.getDefaultState.bind(this);
        this.onTextChange = this.onTextChange.bind(this);
        this.onSelectHeaderRow = this.onSelectHeaderRow.bind(this);
        this.onSelectFooterRow = this.onSelectFooterRow.bind(this);
        this.updateFilter = this.updateFilter.bind(this);
        this.cancelUpdates = this.cancelUpdates.bind(this);

        this.state = this.getDefaultState();
    }
    private getDefaultState() {
        const { data_partner_name, feed_name } = this.props.params.common;
        const { header_row_count, trailer_row_count } = this.props.params.ignore_lines ? this.props.params.ignore_lines.params : { header_row_count: 0, trailer_row_count: 0 };
        return {
            data_partner_name,
            feed_name,
            header_row_count,
            trailer_row_count,
            fileType: 'fixedWidth',
            errors: {}
        };
    }
    private onTextChange(event, value) {
        const fieldName = event.target.id;

        this.setState({ [fieldName]: value });
    }
    private onSelectHeaderRow(event, index, value) {
        this.setState({ header_row_count: index });
    }
    private onSelectFooterRow(event, index, value) {
        this.setState({ trailer_row_count: index });
    }
    private updateFilter() {
        let { errors } = this.state;
        // validate fields
        const mandatoryFields = [
            'data_partner_name',
            'feed_name',
            'header_row_count',
            'trailer_row_count',
            'fileType'
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

        // re-construct params
        const common = {
            feed_name: this.state.feed_name,
            data_partner_name: this.state.data_partner_name,
        };

        const ignore_lines = {
            params: {
                header_row_count: this.state.header_row_count,
                trailer_row_count: this.state.trailer_row_count
            }
        };

        const params = _.assign({}, this.props.params, { common }, { ignore_lines });
        this.props.onSave(params);
    }
    private cancelUpdates() {
        this.setState(this.getDefaultState());
    }
    public render(): JSX.Element {
        return (<div>
            <form>
                <RadioButtonGroup name="fileType" defaultSelected={this.state.fileType}>
                    <RadioButton
                        value="csv"
                        label="CSV"
                        disabled={true}
                        style={style.radioButton}
                    />
                    <RadioButton
                        value="fixedWidth"
                        label="Fixed Width"
                        style={style.radioButton}
                    />
                </RadioButtonGroup>
                <TextField
                    id="feed_name"
                    fullWidth={true}
                    floatingLabelText="Feed Name"
                    value={this.state.feed_name}
                    errorText={this.state.errors.feed_name}
                    onChange={this.onTextChange}
                />

                <TextField
                    id="data_partner_name"
                    fullWidth={true}
                    floatingLabelText="Partner"
                    value={this.state.data_partner_name}
                    errorText={this.state.errors.data_partner_name}
                    onChange={this.onTextChange}
                />
                <div style={style.multiFieldContainer}>
                    <div style={style.multiFieldItem}>
                        <SelectField
                            id="header_row_count"
                            fullWidth={true}
                            value={this.state.header_row_count}
                            onChange={this.onSelectHeaderRow}
                            floatingLabelText="Header Rows"
                        >
                            {_.times(10, (c) => {
                                return <MenuItem key={c} value={c} primaryText={c} />;
                            })}
                        </SelectField>
                    </div>

                    <div style={style.multiFieldItem}>
                        <SelectField
                            id="trailer_row_count"
                            fullWidth={true}
                            value={this.state.trailer_row_count}
                            onChange={this.onSelectFooterRow}
                            floatingLabelText="Footer Rows"
                        >
                            {_.times(10, (c) => {
                                return <MenuItem key={c} value={c} primaryText={`${c}`} />;
                            })}
                        </SelectField>
                    </div>
                </div>
                <div style={style.buttonContainer}>
                    <RaisedButton label="Cancel" onClick={this.cancelUpdates} style={style.cancelButton} />
                    <RaisedButton label="Save" onClick={this.updateFilter} primary={true} />
                </div>
            </form>
        </div>);
    }
}
