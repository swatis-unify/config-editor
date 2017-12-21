import * as React from 'react';
import * as _ from 'lodash';

import {
    Table,
    TableHeader,
    TableHeaderColumn,
    TableBody,
    TableRow,
    TableRowColumn,
    IconButton,
    RaisedButton
} from 'material-ui';

import UpArrow from 'material-ui/svg-icons/navigation/arrow-drop-up';
import DownArrow from 'material-ui/svg-icons/navigation/arrow-drop-down';

interface IFeed {
    name: string;
    feed_name: string;
    data_partner_name: string;
    download_url: string;
}
interface IFeedTableProps {
    headers: IHeader[];
    feeds: IFeed[];
    filter: any;
    onSort: (filterName, value) => void;
    onEdit: (feedname) => void;
    onCreateNew: (feedUrl) => void;
}

interface IHeader {
    title: string;
    sortable?: boolean;
    attribute?: string;
}

const tableStyle: React.CSSProperties = {
    header: { backgroundColor: '#009688' },
    headerText: { fontSize: 16, color: 'white' },
    sortableHeader: { position: 'relative', top: -4, cursor: 'pointer' },
    sortButton: { top: 7 },
    dataPartner: { textTransform: 'UPPERCASE' },
    button: { margin: '0 5px' }
};

export default class FeedTable extends React.Component<IFeedTableProps, null> {
    constructor(props, context) {
        super(props, context);

        this.sortRows = this.sortRows.bind(this);
        this.getSortDirection = this.getSortDirection.bind(this);
        this.getHeaderRow = this.getHeaderRow.bind(this);
        this.editFeed = this.editFeed.bind(this);
        this.createNewFeed = this.createNewFeed.bind(this);
    }
    private getSortDirection(filterName): JSX.Element {
        return (this.props.filter[filterName] === 'asc') ? <UpArrow color='#fff' /> : <DownArrow color='#fff' />;
    }
    private sortRows(event) {
        const filterName = event.currentTarget.id;
        const value = this.props.filter[filterName] === 'asc' ? 'desc' : 'asc';
        this.props.onSort(filterName, value);
    }
    private getHeaderRow(header): JSX.Element {
        if (header.sortable) {
            return (
                <span style={tableStyle.sortableHeader}>
                    <span id={header.attribute} onClick={this.sortRows}>{header.title}</span>
                    <IconButton id={header.attribute} onClick={this.sortRows} style={tableStyle.sortButton}>
                        {this.getSortDirection(header.attribute)}
                    </IconButton>
                </span>
            );
        } else {
            return (
                <span>{header.title}</span>
            );
        }
    }
    private editFeed(event) {
        const feedName = event.currentTarget.id;
        this.props.onEdit(feedName);
    }
    private createNewFeed(event) {
        const feedName = event.currentTarget.id;
        this.props.onCreateNew(feedName);
    }
    public render(): JSX.Element {
        return (
            <Table fixedHeader={true} selectable={false}>
                <TableHeader displaySelectAll={false} adjustForCheckbox={false} style={tableStyle.header}>
                    <TableRow selectable={false}>
                        {_.map(this.props.headers, header => {
                            return <TableHeaderColumn key={header.title} style={tableStyle.headerText}>{this.getHeaderRow(header)}</TableHeaderColumn>;
                        })}
                    </TableRow>
                </TableHeader>
                <TableBody displayRowCheckbox={false}>
                    {this.props.feeds.map(feed => {
                        return (
                            <TableRow hoverable={true} selectable={false} key={feed.name}>
                                <TableRowColumn style={tableStyle.dataPartner}>{feed.data_partner_name}</TableRowColumn>
                                <TableRowColumn>{feed.feed_name}</TableRowColumn>
                                <TableRowColumn>
                                    <div>
                                        <RaisedButton id={feed.name} label="Edit" primary={true} onClick={this.editFeed} style={tableStyle.button} />
                                        <RaisedButton id={feed.name} label="Create As New" secondary={true} onClick={this.createNewFeed} style={tableStyle.button} />
                                    </div>
                                </TableRowColumn>
                            </TableRow>
                        );
                    })}
                </TableBody>
            </Table>
        );
    }
}

