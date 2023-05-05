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

import { useSelector } from "react-redux";
export default function DemoCantomonInfoDynamic() {
    const current_page = useSelector((state) => state?.navStore.current_page);
    const selected_cantomon = useSelector((state) => state?.cantomonStore.selected_cantomon);

    React.useEffect(() => {
        console.log("selected_cantomon : ", selected_cantomon);
    }, [selected_cantomon]);
    return (
        <>

            <div className="panel-header">
                <Link className="panel-back-button left" href="#" ><Image src={BackButton} alt="back button" /> </Link>
                <div className="title middle">Management</div>
                <Link className="panel-close-button right" href="#" ><Image src={CloseButton} alt="close button" /></Link>
            </div>
            <div className="panel-body">
                <div className="container">
                    <div className="row">
                        <div className="col-6 image-wrapper">
                            <div className="box-header">&nbsp;</div>
                            <div className="box-body">

                                <Image src={selected_cantomon && 'image' in selected_cantomon ? (selected_cantomon.image) : (Creatures3)} alt="creatures cantomon" />
                                <p className="name">{(
                                selected_cantomon && 
                                'id' in selected_cantomon && 
                                'title' in selected_cantomon ) ? (selected_cantomon.title + " #" + selected_cantomon.id) : ("Metamon Name")}</p>
                            </div>

                            <div className="box-footer">&nbsp;</div>
                        </div>
                        <div className="col-6 text-wrapper">
                            <div className="row description">
                            {
                                        selected_cantomon && "description" in selected_cantomon && selected_cantomon.description instanceof Array && (
                                            selected_cantomon.description.map((el, i, arr) => {
                                                return (
                                                    <p key={i}>{el}</p>
                                                )
                                            })
                                        )
                                }
                            </div>
                            <div className="row loader">
                                <div className="progress">
                                    <div className="progress-bar" role="progressbar" aria-label="Basic example" style={{ width: "100%" }} aria-valuenow="25" aria-valuemin="0" aria-valuemax="100"></div>
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
                {
                    current_page != "/cantomon-management/dojo" ? (
                        <ul className="nav">
                            <li className="nav-item">
                                <Link className="nav-link" href="/cantomon-management/train">Train</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" href="/cantomon-management/feed">Feed</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" href="/cantomon-management/hatch">Evolve</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" href="/cantomon-management/battle">Battle</Link>
                            </li>
                        </ul>
                    ) : (
                        <ul className="nav dojo">
                            <li className="nav-item">
                                <Link className="nav-link" href="#">Create</Link>
                            </li>
                            <li className="nav-item register">
                                <Link className="nav-link register-link" href="#">Register</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" href="#">Close</Link>
                            </li>
                        </ul>
                    )
                }

            </div>
        </>
    )
}