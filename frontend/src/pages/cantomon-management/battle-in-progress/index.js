import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

import Head from 'next/head';
import { useDispatch, useSelector } from "react-redux";
import { setCurrentPage } from '@/features/manageNavigationState';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import Modal from '@/components/utils/modal';

const DynamicComponentWithNoSSR = dynamic(
    () => import('@/phaser/battle-in-progress/app'),
    { ssr: false }
)
export default function CantomonManagementBattleInProgress() {


    const [visible, setVisible] = React.useState(false);
    const [loading, setLoading] = useState(false);

    const router = useRouter();

    const dispatch = useDispatch();
    const current_page = useSelector((state) => state?.navStore.current_page);
    const showModal = () => {
        setVisible(true);
    }
    const closeModal = () => {
        setVisible(false);
    }
    const modalContent = (
        <>
            <p>Battle Result</p>
        </>
    );


    useEffect(() => {
        if (router.isReady) {

            setLoading(true);

        }

    }, [router.isReady]);

    React.useEffect(() => {
        console.log("current_page -> ", current_page);
        if (current_page == "" || current_page != "/cantomon-management/battle-in-progress") {
            dispatch(setCurrentPage({
                current_page: "/cantomon-management/battle-in-progress"
            }))
        }
    }, [])
    return (
        <>
            <div id='battlesecene-main'>
                <Head>
                    <title>Battle In Progress | Cantomon</title>
                </Head>
                <div key={Math.random()} id="battlescene-container" className='battle-scene'>
                </div>
                {loading && (<DynamicComponentWithNoSSR />)}
                {loading && (<div className='btn result'><button onClick={showModal}>Result</button></div>)}

            </div>
            
            <Modal isModalVisible={visible} data={{
                goto: "/cantomon-management/battle",
                title: "Window",
                content: modalContent,
                gotoTitle: "Go Back"
            }} closeModal={closeModal} showModal={showModal} />
 
        </>
    )
}