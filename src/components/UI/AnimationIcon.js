import React from 'react';
const MyLottieAnimation = React.lazy(() => import('./MyLottieAnimation'));

 function AnimationIcon({src,style}) {
  return <MyLottieAnimation src={src} style={style} play />;
}
export default AnimationIcon