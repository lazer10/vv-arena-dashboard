import React, { useEffect } from 'react';
import '../styles/styles.scss';
import type { AppProps } from 'next/app';

function MyApp({ Component, pageProps }: AppProps) {
  useEffect(() => {
    // eslint-disable-next-line global-require
    require('bootstrap/dist/js/bootstrap.bundle.min.js');
  }, []);
  return (
    <Component {...pageProps} />
  );
}

export default MyApp;
