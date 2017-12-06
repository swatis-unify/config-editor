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
    actions: any;
    files: any[];
    fileContents: any;
}

interface IFeedTableState {
    selectedFile: any;
    fileContents: any;
}

class FeedTable extends React.Component<IFeedTableProps, IFeedTableState> {

    constructor(props, context) {
        super(props, context);

        this.state = {
            selectedFile: null,
            fileContents: { filePath: "", contents: "", sha: "" }
        };

        this.fileSelected = this.fileSelected.bind(this);
    }

    public componentWillReceiveProps(nextProps) {
        if (this.props.fileContents !== nextProps.fileContents) {
            this.setState({
                selectedFile: this.state.selectedFile,
                fileContents: {
                    filePath: nextProps.fileContents.filePath,
                    contents: nextProps.fileContents.contents,
                    sha: nextProps.fileContents.sha
                }
            });
        }
    }

    private updateFileContents(){
        this.props.actions.updateFileContents(this.state.fileContents.filePath,
                                              this.state.fileContents.contents,
                                              this.state.fileContents.sha);
    }

    private fileSelected(item) {
        let filePath = item.path;
        this.props.actions.getFileContents(filePath);
    }

    private fileContentChanged(event) {
        this.setState({
            fileContents: {
                filePath: this.state.fileContents.filePath,
                contents: event.target.value,
                sha: this.state.fileContents.sha
            }
        });
    }

    public render(): JSX.Element {

        const rows = this.props.files.map(file => {
            return (
                <li key={file.path}>
                    <a onClick={(e) => this.fileSelected(file)}>{file.name}</a>
                </li>
            );
        });
        return (
            <div>
                <ul>
                    {...rows}
                </ul>
                <textarea rows={10} 
                          cols={50} 
                          onChange={(e) => this.fileContentChanged(e)} 
                          value={this.state.fileContents.contents}></textarea>
                <input type="button" value="Save" onClick={(e) => this.updateFileContents()} />
            </div>
        );
    }

}

export default FeedTable;

