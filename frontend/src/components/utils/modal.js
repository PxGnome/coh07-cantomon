import React from "react";
import Link from "next/link";
import { useRouter } from 'next/router';

export default function Modal({isModalVisible, data, closeModal}) {
    const router = useRouter();

    const gotoPage = (e) => {
        e.preventDefault(); 
        router.push(data.goto);
    }
    return (
        <div className={isModalVisible ? ("modal show") : ("modal")} tabIndex="-1">
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">{data.title}</h5>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"

                            onClick={closeModal}></button>
                    </div>
                    <div className="modal-body">
                        {data.content}
                    </div>
                    <div className="modal-footer center">
                        <button type="button" className="btn btn-primary"

                            onClick={gotoPage}>{data.gotoTitle}</button>
                    </div>
                </div>
            </div>
        </div>
    )
}