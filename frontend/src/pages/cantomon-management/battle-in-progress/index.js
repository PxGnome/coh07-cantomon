import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

import Head from 'next/head';
import { useDispatch, useSelector } from "react-redux";
import { setCurrentPage } from '@/features/manageNavigationState';
import dynamic from 'next/dynamic';
import Link from 'next/link';

const DynamicComponentWithNoSSR = dynamic(
    () => import('@/phaser/battle-in-progress/app'),
    { ssr: false }
)
export default function CantomonManagementBattleInProgress() {

    
    const [visible, setVisible] = React.useState(false);
    const [loading, setLoading] = useState(false);

 
    const closeModal = () => {
       setVisible(false); 
    }
    const goBack = () => {
        router.push("/cantomon-management/battle");
    }
    const router = useRouter();

    const dispatch = useDispatch();
    const current_page = useSelector((state) => state?.navStore.current_page);
    const showModal = () => {
        setVisible(true); 
     }
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
            <div className={visible ? ("modal show") : ("modal")}>
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title">Window</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"

                                onClick={closeModal}></button>
                        </div>
                        <div className="modal-body">
                            <p>Battle Result</p>
                        </div>
                        <div className="modal-footer center">
                            <button type="button" className="btn btn-primary"

                                onClick={goBack}>Go Back</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}