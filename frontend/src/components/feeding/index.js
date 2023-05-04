import React from "react";
import Link from "next/link";
import Image from "next/image";
import Creatures3 from "./../../assets/cantomon/creatures3.png";
import TrainIcon from "./../../assets/button/train_cm_icon.png";
import FeedIcon from "./../../assets/button/feed_cm_icon.png";
import BattleIcon from "./../../assets/button/battle_cm_icon.png";
import CherryFood from "./../../assets/food/cherry.png";
import ChickenFood from "./../../assets/food/chicken.png";

import BackButton from "./../../assets/button/back_button_icon.png";
import CloseButton from "./../../assets/button/close_button_icon.png";
import { useSelector } from "react-redux";
export default function Feeding() {
    const selected_cantomon = useSelector((state) => state?.cantomonStore.selected_cantomon);

    React.useEffect(() => {
        console.log("selected_cantomon : ", selected_cantomon);
    }, [selected_cantomon]);
    return (
        <div id="cantomon-management-feeding" className="container">
            <div className="row">
                <div className="col-6 cantomon-detail-panel">

                    <div className="list-group-header-wrapper">
                        <div className="combination">
                            <div className="list-group-header">
                                <Link className="panel-back-button left" href="/cantomon-management" ><Image src={BackButton} alt="back button" /> </Link>
                                <div className="title middle">Feeding</div>
                                <Link className="panel-close-button right" href="#" ><Image src={CloseButton} alt="close button" /></Link>

                            </div>
                            <div className="list-group-subheader">
                                <h2 className="title">&nbsp;</h2>
                            </div>
                        </div>
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
                                            'title' in selected_cantomon) ? (selected_cantomon.title + " #" + selected_cantomon.id) : ("Metamon Name")}</p>

                                    </div>

                                    <div className="box-footer">&nbsp;</div>
                                </div>
                                <div className="col-6 text-wrapper">
                                    <div className="row action_menu">
                                        <div className="container-fluid">
                                            <div className="row">
                                                <div className="col-4 image_wrapper">
                                                    <Image src={CherryFood} width={16} height={16} alt="cherry food" />
                                                </div>
                                                <div className="col-8 text_wrapper">Food 1</div>
                                            </div>
                                            <div className="row">
                                                <div className="col-4 image_wrapper">
                                                    <Image src={ChickenFood} width={16} height={16} alt="chicken food" />
                                                </div>
                                                <div className="col-8 text_wrapper">Food 2</div>
                                            </div>
                                            <div className="row">
                                                <div className="col-4 image_wrapper"></div>
                                                <div className="col-8 text_wrapper">Food 3</div>
                                            </div>
                                            <div className="row">
                                                <div className="col-4 image_wrapper"></div>
                                                <div className="col-8 text_wrapper">Food 4</div>
                                            </div>
                                            <div className="row">
                                                <div className="col-4 image_wrapper"></div>
                                                <div className="col-8 text_wrapper">Food 5</div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="action_button">
                                        <Link href={"#"}>
                                            Feed
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="panel-body-footer">
                        &nbsp;
                    </div>

                </div>
            </div>
        </div>
    )
}