import React from "react";
import Link from "next/link";
import Image from "next/image";
import Creatures3 from "./../../assets/cantomon/creatures3.png";
import DemoCantomonCollection from "./demo_cantomon_collection";
import DemoCantomonInfo from "./demo_cantomon_info";
export default function CantomonManagement() {
    return (
        <div id="cantomon-management" className="container">
            <div className="row">
                <div className="col-6 cantomon-list">
                    <DemoCantomonCollection />
                </div>
                <div className="col-6 cantomon-detail-panel">
                    <DemoCantomonInfo />
                </div>
            </div>
        </div>
    )
}