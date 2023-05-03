import DemoNFTItem from "./demo_nft_item";
export default function NFTCollectionItem() {
    return (
        <div id="nft-collection-item" className="container">
            <div className="list-group-header-wrapper">
                <div className="combination">
                    <div className="list-group-header"></div>
                    <div className="list-group-subheader">
                        <h2 className="title">Select NFT</h2>
                    </div>
                </div>
            </div>
            <DemoNFTItem />
        </div>
    )
}