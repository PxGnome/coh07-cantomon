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

import { useDispatch, useSelector } from "react-redux";
import { setCurrentEnemy } from '@/features/cantomonSelectionState';
export default function DemoCantomonInfoDynamic() {
    const current_page = useSelector((state) => state?.navStore.current_page);
    const selected_cantomon = useSelector((state) => state?.cantomonStore.selected_cantomon);
    const selected_enemy = useSelector((state) => state?.cantomonStore.selected_enemy);
    const dispatch = useDispatch();

    React.useEffect(() => {
        console.log("selected_enemy : ", selected_enemy);
    }, [selected_cantomon, selected_enemy]);

    const removeEnemy = () => {
        dispatch(setCurrentEnemy({
            selected_enemy: ""
        }));
    }
    return (
        <>

            <div className="panel-header">
                <Link className="panel-back-button left" href="/cantomon-management" ><Image src={BackButton} alt="back button" /> </Link>
                <div className="title middle">Battle</div>
                <Link className="panel-close-button right" href="#" onClick={removeEnemy} ><Image src={CloseButton} alt="close button" /></Link>
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

                        {selected_enemy == "" ? (
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
                                        <div className="progress-bar" role="progressbar" aria-label="Basic example" style={{ width: "25%" }} aria-valuenow="25" aria-valuemin="0" aria-valuemax="100"></div>
                                    </div>
                                </div>
                            </div>
                        ) : (

                            <div className="col-6 image-wrapper">
                                <div className="box-header">&nbsp;</div>
                                <div className="box-body">

                                    <Image src={selected_enemy && 'image' in selected_enemy ? (selected_enemy.image) : (Creatures3)} alt="creatures cantomon" />
                                    <p className="name">{(
                                        selected_enemy &&
                                        'id' in selected_enemy &&
                                        'title' in selected_enemy) ? (selected_enemy.title + " #" + selected_enemy.id) : ("Cantomon Name")}</p>
                                </div>

                                <div className="box-footer">&nbsp;</div>
                            </div>
                        )}

                    </div>
                </div>
            </div>
            <div className="panel-body-footer">
                &nbsp;
            </div>
            <div className="panel-footer">
                <ul className="nav">
                    <li className="nav-item">
                        <Link className="nav-link" href="/cantomon-management/battle-in-progress">Battle</Link>
                    </li>
                </ul>
            </div>
        </>
    )
}