import * as React from 'react';
import style from './configsListStyle';
import { IConfig } from './config';

interface IConfigRowProps {
    config: IConfig;
    onEdit: (event) => void;
    onCopyAsNew: (event) => void;
}

import { TableRow, TableRowColumn, RaisedButton } from 'material-ui';

const ConfigRow = (props: IConfigRowProps) => {
    return (
        <TableRow hoverable={true} selectable={false}>
            <TableRowColumn style={style.dataPartnerColumn}>{props.config.dataPartnerName}</TableRowColumn>
            <TableRowColumn>{props.config.feedName}</TableRowColumn>
            <TableRowColumn>
                <div>
                    <RaisedButton id={props.config.path} label="Edit" primary={true} onClick={props.onEdit} style={style.actionButton} />
                    <RaisedButton id={props.config.path} label="Create As New" secondary={true} onClick={props.onCopyAsNew} style={style.actionButton} />
                </div>
            </TableRowColumn>
        </TableRow>
    );
};

export default ConfigRow;
