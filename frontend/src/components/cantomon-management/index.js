import React from "react";
import Link from "next/link";
import Image from "next/image";
import Creatures3 from "./../../assets/cantomon/creatures3.png";
export default function CantomonManagement() {
    return (
        <div id="cantomon-management" className="container">
            <div className="row">
                <div className="col-6 cantomon-list">
                    <div className="list-group">
                        <Link key={1} className="row" href="#">
                            <div className="col-4 image-wrapper">
                                <Image src={Creatures3} alt="creatures cantomon" />
                            </div>
                            <div className="col-8 text-wrapper">
                                <h2 className="title">Metamon #1</h2>
                                <div className="description">
                                    <p>Metamon ....a....</p>
                                    <p>Metamon ....b....</p>
                                    <p>Metamon ....c....</p>
                                </div>
                            </div>

                        </Link>
                        <Link key={2} className="row" href="#">
                            <div className="col-4 image-wrapper">
                                <Image src={Creatures3} alt="creatures cantomon" />
                            </div>
                            <div className="col-8 text-wrapper">
                                <h2 className="title">Metamon #2</h2>
                                <div className="description">
                                    <p>Metamon ....a....</p>
                                    <p>Metamon ....b....</p>
                                    <p>Metamon ....c....</p>
                                </div>
                            </div>

                        </Link>
                        <Link key={3} className="row" href="#">
                            <div className="col-4 image-wrapper">
                                <Image src={Creatures3} alt="creatures cantomon" />
                            </div>
                            <div className="col-8 text-wrapper">
                                <h2 className="title">Metamon #3</h2>
                                <div className="description">
                                    <p>Metamon ....a....</p>
                                    <p>Metamon ....b....</p>
                                    <p>Metamon ....c....</p>
                                </div>
                            </div>

                        </Link>
                    </div>
                </div>
                <div className="col-6 cantomon-detail-panel">
                    <div className="panel-header">
                        <Link className="panel-back-button left" href="#" >Back</Link>
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
                                    <div className="row loader">
                                        <div class="progress">
                                            <div class="progress-bar" role="progressbar" aria-label="Basic example" style={{width: "25%"}} aria-valuenow="25" aria-valuemin="0" aria-valuemax="100"></div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="panel-footer">
                        <ul className="nav">
                            <li className="nav-item">
                                <Link className="nav-link" href="/cantomon-management/train">Train</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" href="/cantomon-management/feed">Feed</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" href="/cantomon-management/battle">Battle</Link>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    )
}