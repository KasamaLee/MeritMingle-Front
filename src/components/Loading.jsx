import React from 'react';
import { HashLoader } from 'react-spinners';
import { useAuth } from '../hooks/use-auth';
import LottieLoader from './LottieLoader';

export default function Route() {

    return (
        <div className='flex justify-center items-center w-screen h-screen'>
            <HashLoader color={"#F97316"} size={120} speedMultiplier={1.6} />
            {/* <LottieLoader animationData={animationData} /> */}
        </div>
    )
}
