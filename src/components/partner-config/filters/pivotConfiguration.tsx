import * as React from 'react';

interface IFilterProps {
    params?: any;
}

export default class PivotConfiguration extends React.Component<IFilterProps, null> {
    public render(): JSX.Element {
        return (<div>Show Pivot configuration form</div>);
    }
}
