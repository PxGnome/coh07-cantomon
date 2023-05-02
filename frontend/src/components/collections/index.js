import Link from "next/link";
import Image from "next/image";
import EggPlaceholder from "./../../assets/nft-collection/egg-placeholder.png";
import DemoNFTCollection from "./demo_nft_collection";

export default function NFTCollections() {
    return (
        <div id="nft-collection" className="container nft-collections">
            <div className="list-group-header-wrapper">
                <div className="list-group-header"></div>
            </div>
            <DemoNFTCollection />
        </div>
    )
}