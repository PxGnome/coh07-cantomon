import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

import Head from 'next/head';   
import { useDispatch, useSelector } from "react-redux";
import { setCurrentPage } from '@/features/manageNavigationState';
import dynamic from 'next/dynamic'; 

const DynamicComponentWithNoSSR = dynamic(
    () => import('@/phaser/battle-in-progress/app'),
    { ssr: false }
)
export default function CantomonManagementBattleInProgress() {

    const [loading, setLoading] = useState(false);
    const router = useRouter(); 

    const dispatch = useDispatch(); 
    const current_page = useSelector((state) => state?.navStore.current_page); 

    useEffect(() => {
        if (router.isReady) {

            setLoading(true);

        }

    }, [router.isReady]);

    React.useEffect(() => {
        console.log("current_page -> ", current_page);
        if(current_page == "" || current_page != "/cantomon-management/battle-in-progress"){
            dispatch(setCurrentPage({
                current_page: "/cantomon-management/battle-in-progress"
            }))
        }
    },[])
    return (
        <>
            <Head>
                <title>Battle In Progress | Cantomon</title>
            </Head> 
            <div key={Math.random()} id="battlescene-container" className='battle-scene'></div>
            {loading && (<DynamicComponentWithNoSSR test="test" />)}
        </>
    )
}