import * as React from 'react';
import * as _ from 'lodash';
import { Dialog, TextField, FlatButton } from 'material-ui';

interface IDialogProps {
    isOpen: boolean;
    onCancel: () => void;
    onSave: (string) => void;
}

interface IDialogState {
    fileName: string;
    errors: any;
}

export default class FileRenameDialog extends React.Component<IDialogProps, IDialogState> {
    constructor(props, context) {
        super(props, context);

        this.state = {
            fileName: '',
            errors: {}
        };

        this.submitDialog = this.submitDialog.bind(this);
        this.onTextChange = this.onTextChange.bind(this);
    }
    private onTextChange(event, fileName) {
        this.setState({ fileName });
    }
    private submitDialog() {
        console.log('validate and pass the value');
        let { errors } = this.state;
        const fileFormat = /\w+\_\w+.cfg$/;

        // reset errors
        errors = {};
        if (!this.state.fileName) {
            errors.fileName = 'required';
        } else if (!this.state.fileName.match(fileFormat)) {
            errors.fileName = 'must be in format partner_feed.cfg';
        }

        this.setState({ errors });

        if (_.values(errors).length > 0) {
            return false;
        }

        this.props.onSave(this.state.fileName);
    }
    public render(): JSX.Element {
        const dialogActions = [
            <FlatButton
                key="cancel"
                label="Cancel"
                onClick={this.props.onCancel}
            />,
            <FlatButton
                key="submit"
                label="Submit"
                primary={true}
                onClick={this.submitDialog}
            />,
        ];

        return (<Dialog
            title="Name of the file"
            actions={dialogActions}
            modal={true}
            open={this.props.isOpen}
        >
            <form>
                <TextField
                    id="fileName"
                    fullWidth={true}
                    errorText={this.state.errors.fileName}
                    value={this.state.fileName}
                    onChange={this.onTextChange}
                />
            </form>
        </Dialog>);
    }
}
