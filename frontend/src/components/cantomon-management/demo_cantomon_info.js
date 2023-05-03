import React from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from 'next/router';
import Creatures3 from "./../../assets/cantomon/creatures3.png";
import TrainIcon from "./../../assets/button/train_cm_icon.png";
import FeedIcon from "./../../assets/button/feed_cm_icon.png";
import BattleIcon from "./../../assets/button/battle_cm_icon.png";

import BackButton from "./../../assets/button/back_button_icon.png";
import CloseButton from "./../../assets/button/close_button_icon.png";

export default function DemoCantomonInfo() {
    return (
        <>

            <div className="panel-header">
                <Link className="panel-back-button left" href="#" ><Image src={BackButton} alt="back button" /> </Link>
                <div className="title middle">Upgrade</div>
                <Link className="panel-close-button right" href="#" ><Image src={CloseButton} alt="close button" /></Link>
            </div>
            <div className="panel-body">
                <div className="container">
                    <div className="row">
                        <div className="col-6 image-wrapper">
                            <div className="box-header">&nbsp;</div>
                            <div className="box-body">

                                <Image src={Creatures3} alt="creatures cantomon" />
                                <p className="name">Metamon Name</p>
                            </div>

                            <div className="box-footer">&nbsp;</div>
                        </div>
                        <div className="col-6 text-wrapper">
                            <div className="row description">
                                <p>description ...</p>
                            </div>
                            <div className="row loader">
                                <div class="progress">
                                    <div class="progress-bar" role="progressbar" aria-label="Basic example" style={{ width: "25%" }} aria-valuenow="25" aria-valuemin="0" aria-valuemax="100"></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="panel-body-footer">
                &nbsp;
            </div>
            <div className="panel-footer">
                <ul className="nav">
                    <li className="nav-item">
                        <Link className="nav-link" href="/cantomon-management/train"><Image alt="train button" src={TrainIcon} width={64} height={28} /></Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" href="/cantomon-management/feed"><Image alt="feed button" src={FeedIcon} width={64} height={28} /></Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" href="/cantomon-management/battle"><Image alt="battle button" src={BattleIcon} width={64} height={28} /></Link>
                    </li>
                </ul>
            </div>
        </>
    )
}