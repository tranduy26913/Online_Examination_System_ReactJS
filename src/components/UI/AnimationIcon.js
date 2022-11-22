import React from 'react';
const MyLottieAnimation = React.lazy(() => import('./MyLottieAnimation'));

export  function MyComponent({src,style}) {
  return <MyLottieAnimation src={src} style={style} play />;
}