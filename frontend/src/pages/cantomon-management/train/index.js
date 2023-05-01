import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

import Head from 'next/head'; 
import Training from '@/components/training';

import { useDispatch, useSelector } from "react-redux";
import { setCurrentPage } from '@/features/manageNavigationState';
export default function CantomonManagementTraining() {

    const router = useRouter();
    const { slug } = router.query;

    const dispatch = useDispatch(); 
    const current_page = useSelector((state) => state?.navStore.current_page);

    React.useEffect(() => {
        console.log("current_page -> ", current_page);
        if(current_page == "" || current_page != "/cantomon-management/train"){
            dispatch(setCurrentPage({
                current_page: "/cantomon-management/train"
            }))
        }
    },[])
    return (
        <>

            <Head>
                <title>{slug} | Cantomon - Train</title>
            </Head> 
            <Training />
        </>
    )
}