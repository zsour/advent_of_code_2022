import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import Head from 'next/head';

function MainCard(args: {title: string, children?: React.ReactNode}) {

  const router = useRouter();

  function renderGoBackButton(){
    if(router.pathname !== "/"){
      return <Link href="/">
            <span className="go-back-button"></span>
      </Link>
    }
  }

  return (
    <>
      <Head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link href="https://fonts.googleapis.com/css2?family=Nerko+One&display=swap" rel="stylesheet" />
      </Head>

        <div className="main-card">
          <div className="card-header">
            {renderGoBackButton()}
            <h1 className="card-header-text">{args.title}</h1>
          </div>

            {args.children}
        </div>
    </>
  )
}

export default MainCard;