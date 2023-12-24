import React from 'react';
import LoadingImage from './Images/giphy (2).gif';

function Loading(): JSX.Element {
  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <img style={{ width: '100px' }} src={LoadingImage} alt='Loading Spinner' />
    </div>
  );
}

export default Loading;
