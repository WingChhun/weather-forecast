import React from 'react';
import LoaderSrc from 'Assets/loader.svg';

const Loader = (props) => {
  return <img src={LoaderSrc} alt={'Loader'} {...props} />;
};

export default React.memo(Loader);
