import * as React from 'react';
import { CircularProgress } from 'material-ui';
import style from './appStyle';

const Loader = () => {
    return (<div style={style.loaderStyle}>
        <CircularProgress size={60} thickness={7} style={{ top: '50%', left: '48%' }} />
    </div>);
};

export default Loader;
