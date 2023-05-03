import React from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from 'next/router';
import Creatures3 from "./../../assets/cantomon/creatures3.png";
import Creatures4 from "./../../assets/cantomon/creatures4.png";
import Creatures5 from "./../../assets/cantomon/creatures5.png";
import Creatures6 from "./../../assets/cantomon/creatures6.png";

import { useDispatch, useSelector } from "react-redux";
import { setCurrentCantomon } from '@/features/cantomonSelectionState';
export default function DemoCantomonCollectionDynamic() {
    const [selectedItem, setSelectedItem] = React.useState("");
    const selected_cantomon = useSelector((state) => state?.cantomonStore.selected_cantomon);
    const dispatch = useDispatch(); 
    React.useEffect(() => {
        if(selectedItem == "" && selected_cantomon && 'id' in selected_cantomon) {
            setSelectedItem(selected_cantomon.id);
        }
    })
    const creatures = [
        {
            "id": "1",
            "image": Creatures3,
            "title": "Metamon",
            "description": [
                "Metamon ....a....",
                "Metamon ....b....",
                "Metamon ....c...."
            ]
        },
        {
            "id": "2",
            "image": Creatures4,
            "title": "Metamon",
            "description": [
                "Metamon ....aa....",
                "Metamon ....bb....",
                "Metamon ....cc...."
            ]
        },
        {
            "id": "3",
            "image": Creatures5,
            "title": "Metamon",
            "description": [
                "Metamon ....aaa....",
                "Metamon ....bbb....",
                "Metamon ....ccc...."
            ]
        },
        {
            "id": "4",
            "image": Creatures6,
            "title": "Metamon",
            "description": [
                "Metamon ....aaaa....",
                "Metamon ....bbbb....",
                "Metamon ....cccc...."
            ]
        },
        {
            "id": "5",
            "image": Creatures3,
            "title": "Metamon",
            "description": [
                "Metamon ....a....",
                "Metamon ....b....",
                "Metamon ....c...."
            ]
        },
        {
            "id": "6",
            "image": Creatures3,
            "title": "Metamon",
            "description": [
                "Metamon ....a....",
                "Metamon ....b....",
                "Metamon ....c...."
            ]
        },
        {
            "id": "7",
            "image": Creatures3,
            "title": "Metamon",
            "description": [
                "Metamon ....a....",
                "Metamon ....b....",
                "Metamon ....c...."
            ]
        },
        {
            "id": "8",
            "image": Creatures3,
            "title": "Metamon",
            "description": [
                "Metamon ....a....",
                "Metamon ....b....",
                "Metamon ....c...."
            ]
        },
        {
            "id": "9",
            "image": Creatures3,
            "title": "Metamon",
            "description": [
                "Metamon ....a....",
                "Metamon ....b....",
                "Metamon ....c...."
            ]
        },
        {
            "id": "10",
            "image": Creatures3,
            "title": "Metamon",
            "description": [
                "Metamon ....a....",
                "Metamon ....b....",
                "Metamon ....c...."
            ]
        },
        {
            "id": "11",
            "image": Creatures3,
            "title": "Metamon",
            "description": [
                "Metamon ....a....",
                "Metamon ....b....",
                "Metamon ....c...."
            ]
        },
        {
            "id": "12",
            "image": Creatures3,
            "title": "Metamon",
            "description": [
                "Metamon ....a....",
                "Metamon ....b....",
                "Metamon ....c...."
            ]
        },
        {
            "id": "13",
            "image": Creatures3,
            "title": "Metamon",
            "description": [
                "Metamon ....a....",
                "Metamon ....b....",
                "Metamon ....c...."
            ]
        }
    ];

    const setCantomonSelection = (e, index) => { 
        const selected = creatures[index];
        if(selected) {
            setSelectedItem(selected.id);
            dispatch(setCurrentCantomon({
                selected_cantomon: selected
            })); 
        }
    }
    return (
        <div className="container list-group">
            {
                creatures.map((element, index, array) => {
                    return (
                        <Link key={index} className={selectedItem == element.id ? ("row active") : ("row")} href="#" onClick={(e) => setCantomonSelection(e, index)}>
                            <div className="col-4 image-wrapper">
                                <Image src={element.image} alt={"creatures cantomon " + element.id} />
                            </div>
                            <div className="col-8 text-wrapper">
                                <h2 className="title">{element.title}{ " #"+ element.id}</h2>
                                <div className="description">
                                    {
                                        "description" in element && element.description instanceof Array && (
                                            element.description.map((el, i, arr) => {
                                                return (
                                                    <p>{el}</p>
                                                )
                                            })
                                        )
                                    }
                                </div>
                            </div>

                        </Link>

                    );
                })
            }
        </div>
    )
}