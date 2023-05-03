import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

import Head from 'next/head'; 
import Battling from '@/components/battling';

import { useDispatch, useSelector } from "react-redux";
import { setCurrentPage } from '@/features/manageNavigationState';
export default function CantomonManagementBattling() {

    const router = useRouter();
    const { slug } = router.query;

    const dispatch = useDispatch(); 
    const current_page = useSelector((state) => state?.navStore.current_page);

    React.useEffect(() => {
        console.log("current_page -> ", current_page);
        if(current_page == "" || current_page != "/cantomon-management/battle"){
            dispatch(setCurrentPage({
                current_page: "/cantomon-management/battle"
            }))
        }
    },[])
    return (
        <>
            <Head>
                <title>{slug} | Cantomon - Battle</title>
            </Head> 
            <Battling />
        </>
    )
}