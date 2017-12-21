import * as React from 'react';
import { CircularProgress } from 'material-ui';

const loaderStyle: React.CSSProperties = {
    container: {
        position: 'absolute',
        width: '100vw',
        height: '100vh',
        zIndex: 1200
    },
    loader: { top: '50%', left: '48%' }
};

const Loader = () => {
    return (<div style={loaderStyle.container}>
        <CircularProgress size={60} thickness={7} style={loaderStyle.loader} />
    </div>);
};

export default Loader;
