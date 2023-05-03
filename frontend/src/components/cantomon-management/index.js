import React from "react";
import Link from "next/link";
import Image from "next/image";
import Creatures3 from "./../../assets/cantomon/creatures3.png";
import DemoCantomonCollection from "./demo_cantomon_collection";
import DemoCantomonCollectionDynamic from "./demo_cantomon_collection_dynamic";
import DemoCantomonInfo from "./demo_cantomon_info";
import DemoCantomonInfoDynamic from "./demo_cantomon_info_dynamic";
export default function CantomonManagement() {
    return (
        <div id="cantomon-management" className="container">
            <div className="row">
                <div className="col-6 cantomon-list">
                    <DemoCantomonCollectionDynamic />
                </div>
                <div className="col-6 cantomon-detail-panel">
                    <DemoCantomonInfoDynamic />
                </div>
            </div>
        </div>
    )
}