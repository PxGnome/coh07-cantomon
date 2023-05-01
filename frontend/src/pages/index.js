import Head from 'next/head';
import Image from 'next/image'; 
import 'bootstrap-icons/font/bootstrap-icons.css'; 
import NFTCollections from '@/components/collections';

export default function Home() {
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
