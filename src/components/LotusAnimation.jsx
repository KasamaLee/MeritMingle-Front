import React from 'react';
import Lottie from 'react-lottie';
import animationLotus from '../assets/lotus.json';

const LotusAnimation = () => {
    const defaultOptions = {
        loop: true,
        autoplay: true,
        animationData: animationLotus,
        rendererSettings: {
            preserveAspectRatio: 'xMidYMid slice' // Adjust as needed
        }
    };

    return <Lottie options={defaultOptions} height={400} width={400} />;
};

export default LotusAnimation;


