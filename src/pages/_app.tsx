import type { AppProps } from 'next/app';
import '../../public/style/main.css';
import Head from 'next/head';
export default function App({ Component, pageProps }: AppProps) {

  return (
    <>
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