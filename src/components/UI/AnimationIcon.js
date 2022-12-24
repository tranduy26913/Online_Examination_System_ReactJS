import React from 'react';
import MyLottieAnimation from './MyLottieAnimation';

 function AnimationIcon({src,style}) {
  return <MyLottieAnimation src={src} style={style} play />;
}
export default AnimationIcon