import * as React from 'react';
import * as _ from 'lodash';

import {
    Table,
    TableHeader,
    TableHeaderColumn,
    TableBody,
    TableRow,
    TableRowColumn
} from 'material-ui';

interface IFeedTableProps {
    files: any[];
}

const FeedTable = (props: IFeedTableProps) => {
    const rows = props.files.map(file => {
        return (
            <TableRow striped={true} selectable={false} key={file.name}>
                <TableRowColumn>{file.name}</TableRowColumn>
                <TableRowColumn>{file.path}</TableRowColumn>
                <TableRowColumn>{file.download_url}</TableRowColumn>
            </TableRow>
        );

    });
    return (
        <Table fixedHeader={true} selectable={false}>
            <TableHeader adjustForCheckbox={false}>
                <TableRow selectable={false}>
                    <TableHeaderColumn>File Name</TableHeaderColumn>
                    <TableHeaderColumn>File Path</TableHeaderColumn>
                    <TableHeaderColumn>Download Link</TableHeaderColumn>
                </TableRow>
            </TableHeader>
            <TableBody stripedRows={true} displayRowCheckbox={false}>
                {...rows}
            </TableBody>
        </Table>
    );
};

export default FeedTable;

