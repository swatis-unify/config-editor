const style: React.CSSProperties = {
    containerStyle: {
        marginTop: 44,
        width: '100%',
        transition: 'margin 0.5s ease-in-out'
    },
    body: { display: 'flex' },
    containerWithDrawer: { marginLeft: 220 },
    containerWithoutDrawer: { marginLeft: 50 },
    topAppBarStyle: {
        position: 'fixed',
        top: 0
    },
    drawerStyle: {
        position: 'fixed',
        top: 40,
        height: '100vh',
        backgroundColor: '#333',
        zIndex: 1000,
        transition: 'width 0.5s ease-in-out',
        overflow: 'hidden',
        whiteSpace: 'nowrap'
    },
    drawerOpen: { width: 220 },
    drawerClose: { width: 50 },
    loaderStyle: {
        position: 'absolute',
        width: '100vw',
        height: '100vh',
        zIndex: 1200
    }
};

export default style;
