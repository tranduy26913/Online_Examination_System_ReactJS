import { Player } from '@lottiefiles/react-lottie-player';
import React from 'react';
// export default function MyLottieAnimation(props) {
//     return <Lottie animationData={'animation'} {...props} />;
// }

function MyLottieAnimation(props) {
    return (<Player
        autoplay
        loop
       {...props} 
    />)
}
export default React.memo(MyLottieAnimation)