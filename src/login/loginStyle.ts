import * as React from 'react';
interface ILoginStyle {
    wrapperStyle: React.CSSProperties;
    loginFormContainer: React.CSSProperties;
    cardText: React.CSSProperties;
}

const styles: ILoginStyle = {
    wrapperStyle: {
        width: '100vw',
        height: '100vh',
        marginTop: -84,
        backgroundImage: 'linear-gradient(to bottom right,#009688, #fff)', /* Standard syntax */
    },
    loginFormContainer: {
        display: 'flex',
        justifyContent: "center",
        position: 'relative',
        top: '40%'
    },
    cardText: { textAlign: 'center' }
};

export default styles;
