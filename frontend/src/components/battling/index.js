import React from "react";
import Link from "next/link";
import Image from "next/image";
import Creatures3 from "./../../assets/cantomon/creatures3.png";
export default function Battling() {
    return (
        <div id="cantomon-management-battling" className="container">
            <div className="row">
                <div className="col-6 cantomon-detail-panel">
                    <div className="panel-header">
                        <Link className="panel-back-button left" href="/cantomon-management" >Back</Link>
                        <div className="title middle">Upgrade</div>
                        <Link className="panel-close-button right" href="#" >Close</Link>
                    </div>
                    <div className="panel-body">
                        <div className="container">
                            <div className="row">
                                <div className="col-6 image-wrapper">
                                    <Image src={Creatures3} alt="creatures cantomon" />
                                    <p className="name">Metamon Name</p>
                                </div>
                                <div className="col-6 text-wrapper">
                                    <div className="row description">
                                        <p>description ...</p>
                                    </div> 
                                </div>
                            </div>
                        </div>
                    </div> 
                </div>
            </div>
        </div>
    )
}