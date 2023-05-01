import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

import Head from 'next/head'; 
export default function CollectionItem() {

    const router = useRouter();
    const { slug } = router.query;
    return (
        <>

            <Head>
                <title>{slug} | Cantomon - Collection Item</title>
            </Head> 
        </>
    )
}