import * as React from 'react';

interface IFilterProps {
    params?: any;
}

export default class DefaultValue extends React.Component<IFilterProps, null> {
    public render(): JSX.Element {
        console.log(this.props.params);
        return (<div>Show default value form</div>);
    }
}