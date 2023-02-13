import '../styles/global.css';

import localFont from '@next/font/local';
import type { AppProps } from 'next/app';

const parisienne = localFont({
  src: [
    {
      path: '../../public/fonts/Parisienne-Regular.ttf',
    },
  ],
  variable: '--font-parisienne',
});

const cormorant = localFont({
  src: [
    {
      path: '../../public/fonts/CormorantGaramond-Light.ttf',
      weight: '300',
    },
    {
      path: '../../public/fonts/CormorantGaramond-Regular.ttf',
      weight: '400',
    },
  ],
  variable: '--font-cormorant',
});

const arimaMadurai = localFont({
  src: [
    {
      path: '../../public/fonts/ArimaMadurai-Thin.ttf',
      weight: '100',
    },
    {
      path: '../../public/fonts/ArimaMadurai-Regular.ttf',
      weight: '400',
    },
    {
      path: '../../public/fonts/ArimaMadurai-Bold.ttf',
      weight: '700',
    },
    {
      path: '../../public/fonts/ArimaMadurai-Black.ttf',
      weight: '900',
    },
  ],
  variable: '--font-arimaMadurai',
});

const MyApp = ({ Component, pageProps }: AppProps) => (
  <main className={`${parisienne.variable} ${cormorant.variable} ${arimaMadurai.variable}`}>
    <Component {...pageProps} />
  </main>
);

export default MyApp;
