import * as React from 'react';

interface IFilterProps {
    params?: any;
}

export default class SQLExpression extends React.Component<IFilterProps, null> {
    public render(): JSX.Element {
        return (<div>Show Business rule overwrite form</div>);
    }
}