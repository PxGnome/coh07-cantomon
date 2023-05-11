import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

import Head from 'next/head'; 
import NFTCollectionItem from '@/components/collection-item';

import { useDispatch, useSelector } from "react-redux";
import { setCurrentPage } from '@/features/manageNavigationState';
export default function CollectionItem(props) {

    const router = useRouter(); 

    const dispatch = useDispatch(); 
    const current_page = useSelector((state) => state?.navStore.current_page);

    React.useEffect(() => { 
        if(current_page == "" || current_page != "/portal"){
            dispatch(setCurrentPage({
                current_page: "/portal"
            }))
        }
    },[])
    return (
        <>

            <Head>
                <title>Cantomon - Portal</title>
            </Head>
            <NFTCollectionItem />
        </>
    )
}