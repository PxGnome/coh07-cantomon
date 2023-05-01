import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

import Head from 'next/head'; 
import NFTCollectionItem from '@/components/collection_item';


import { useDispatch, useSelector } from "react-redux";
import { setCurrentPage } from '@/features/manageNavigationState';
export default function CollectionItem() {

    const router = useRouter();
    const { slug } = router.query;

    const dispatch = useDispatch(); 
    const current_page = useSelector((state) => state?.navStore.current_page);

    React.useEffect(() => {
        console.log("current_page -> ", current_page);
        if(current_page == "" || current_page != "/collection-item/[slug]"){
            dispatch(setCurrentPage({
                current_page: "/collection-item/[slug]"
            }))
        }
    },[])
    return (
        <>

            <Head>
                <title>{slug} | Cantomon - Collection Item</title>
            </Head>
            <NFTCollectionItem />
        </>
    )
}