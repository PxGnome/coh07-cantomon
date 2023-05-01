import React from 'react';
import Head from 'next/head';
import Image from 'next/image'; 
import 'bootstrap-icons/font/bootstrap-icons.css'; 
import NFTCollections from '@/components/collections';

import { useDispatch, useSelector } from "react-redux";
import { setCurrentPage } from '@/features/manageNavigationState';
export default function Home() {
  const dispatch = useDispatch(); 
  const current_page = useSelector((state) => state?.navStore.current_page);
  React.useEffect(() => {
      console.log("current_page -> ", current_page);
      if(current_page != ""){
          dispatch(setCurrentPage({
              current_page: ""
          }))
      }
  },[])
  return (
    <>
      <Head>
        <title>Cantomon</title>
        <meta name="description" content="Cantomon" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <NFTCollections />
    </>
  )
}
