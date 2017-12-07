import * as React from 'react';
import * as _ from 'lodash';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { Snackbar } from 'material-ui';

import * as failureActions from '../../actions/errorStatusActions';
import * as layoutActions from '../../actions/layoutActions';

interface IErrorSnackbarProps {
    apiFailureStatus?: number;
    authFailureStatus?: number;
    actions: any;
    layoutActions: any;
}

class ErrorSnackbar extends React.Component<IErrorSnackbarProps, null> {
    constructor(props, context) {
        super(props, context);

        this.getMessage = this.getMessage.bind(this);
        this.handleSnackbarClose = this.handleSnackbarClose.bind(this);
        this.isSnackbarOpen = this.isSnackbarOpen.bind(this);
    }
    private getMessage(): string {
        if (this.props.authFailureStatus) {
            return 'Something is  not right';
        } else if (this.props.apiFailureStatus) {
            return (this.props.apiFailureStatus === 401 ? 'Please login' : 'Something is not right');
        } else {
            return '';
        }
    }
    private handleSnackbarClose() {
        if (this.props.authFailureStatus) {
            this.props.actions.resetAuthFailureStatus();
            this.props.layoutActions.setRoute('/login');
        } else if (this.props.apiFailureStatus === 401) {
            this.props.actions.resetApiFailureStatus();
            this.props.layoutActions.setRoute('/login');
        } else if (this.props.apiFailureStatus) {
            this.props.actions.resetApiFailureStatus();
        }
    }
    private isSnackbarOpen(): boolean {
        return (this.props.authFailureStatus || this.props.apiFailureStatus) ? true : false;
    }
    public render(): JSX.Element {
        return <Snackbar
            open={this.isSnackbarOpen()}
            message={this.getMessage()}
            autoHideDuration={4000}
            onRequestClose={this.handleSnackbarClose}
        />;
    }

}

const mapStateToProps = (state, ownProps) => {
    return {
        apiFailureStatus: state.apiFailureStatus,
        authFailureStatus: state.authFailureStatus
    };
};
const mapDispatchToProps = (dispatch) => {
    return ({
        actions: bindActionCreators(failureActions, dispatch),
        layoutActions: bindActionCreators(layoutActions, dispatch)
    });
};
export default connect(mapStateToProps, mapDispatchToProps)(ErrorSnackbar);
