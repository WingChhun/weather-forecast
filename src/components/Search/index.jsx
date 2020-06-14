import React from 'react';
import SearchSrc from 'Assets/search.svg';

const Search = (props) => {
  return <img src={SearchSrc} alt={'search'} {...props} />;
};

export default React.memo(Search);
