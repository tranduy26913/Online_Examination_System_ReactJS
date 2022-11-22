import { Player } from '@lottiefiles/react-lottie-player';
import React from 'react';
import Lottie from 'react-lottie-player';
import animation from './ani.json';
export default function MyLottieAnimation(props) {
    return <Lottie animationData={'animation'} {...props} />;
}

// function MyLottieAnimation(props) {
//     return (<Player
//         autoplay
//         loop
//        {...props} 
//     />)
// }
// export default React.memo(MyLottieAnimation,true)