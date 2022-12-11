import type { AppProps } from 'next/app';
import '../../public/style/main.css';
import Head from 'next/head';
import Script from 'next/script';
export default function App({ Component, pageProps }: AppProps) {

  return (
    <>
    <Script src='big-number.js'>

    </Script>
      <Head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link href="https://fonts.googleapis.com/css2?family=Josefin+Sans&family=Nerko+One&display=swap" rel="stylesheet" />
      </Head>
      <span className="content-background"></span>
      <div className='content'>
        <Component {...pageProps} />
      </div>
    </>
  )
}