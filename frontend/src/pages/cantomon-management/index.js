import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

import Head from 'next/head'; 
import CantomonManagement from '@/components/cantomon-management';

import { useDispatch, useSelector } from "react-redux";
import { setCurrentPage } from '@/features/manageNavigationState';
export default function CantomonManagementPage() {

    const router = useRouter();
    const { slug } = router.query;

    const dispatch = useDispatch(); 
    const current_page = useSelector((state) => state?.navStore.current_page);

    React.useEffect(() => {
        console.log("current_page -> ", current_page);
        if(current_page == "" || current_page != "/cantomon-management"){
            dispatch(setCurrentPage({
                current_page: "/cantomon-management"
            }))
        }
    },[])
    return (
        <>

            <Head>
                <title>{slug} | Cantomon - Management</title>
            </Head> 
            <CantomonManagement />
        </>
    )
}