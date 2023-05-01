import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

import Head from 'next/head'; 
import NFTCollectionItem from '@/components/collection_item';
export default function CollectionItem() {

    const router = useRouter();
    const { slug } = router.query;
    return (
        <>

            <Head>
                <title>{slug} | Cantomon - Collection Item</title>
            </Head>
            <NFTCollectionItem />
        </>
    )
}