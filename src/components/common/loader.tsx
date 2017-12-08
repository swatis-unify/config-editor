import * as React from 'react';
import { CircularProgress } from 'material-ui';

const loaderStyle: React.CSSProperties = {
    position: 'absolute',
    width: '100vw',
    height: '100vh',
    zIndex: 1200
    // opacity: 0.7,
    // backgroundColor: 'gray'
};

const Loader = () => {
    return (<div style={loaderStyle}>
        <CircularProgress size={60} thickness={7} style={{ top: '50%', left: '48%' }} />
    </div>);
};

export default Loader;
