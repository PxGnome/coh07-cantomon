import React from "react";
import Link from "next/link";
import Image from "next/image"; 
import Modal from "../utils/modal";

import EggPlaceholder from "./../../assets/nft-collection/egg-placeholder.png";

export default function DemoNFTItem() {
    const [isModalVisible, setModalVisibility] = React.useState(false);
    const showModal = (e) => {
        e.preventDefault();
        setModalVisibility(true); 
    }
    const closeModal = (e) => {
        e.preventDefault();
        setModalVisibility(false); 
    }

    const modalContent = (
        <>
            <p>Transaction in Progress.</p>
            <p>
                <Link className="external-url" href="#" >Link URL</Link>
            </p>
        </>
    );

    return (
        <div className="container list-group">
            <div className="row">
                <Link key={1}
                    className='col-4'
                    href={{
                        pathname: '/collection-item-transaction/[slug]',
                        query: { slug: "1" },

                    }}

                    onClick={showModal}
                >
                    <div className="item card">
                        <h5>#1. Demo NFT Item</h5>
                        <Image src={EggPlaceholder} alt="demo.nft-item.l" width="100" height="100" />

                    </div>
                </Link>

                <Link key={2}
                    className='col-4'
                    href={{
                        pathname: '/collection-item-transaction/[slug]',
                        query: { slug: "2" },

                    }}

                    onClick={showModal}
                >
                    <div className="item card">
                        <h5>#2. Demo NFT Item</h5>
                        <Image src={EggPlaceholder} alt="demo.nft-item.2" width="100" height="100" />

                    </div>
                </Link>

                <Link key={3}
                    className='col-4'
                    href={{
                        pathname: '/collection-item-transaction/[slug]',
                        query: { slug: "3" },

                    }}

                    onClick={showModal}
                >
                    <div className="item card">
                        <h5>#3. Demo NFT Item</h5>
                        <Image src={EggPlaceholder} alt="demo.nft-item.3" width="100" height="100" />

                    </div>
                </Link>
            </div>

            <div className="row">
                <Link key={4}
                    className='col-4'
                    href={{
                        pathname: '/collection-item-transaction/[slug]',
                        query: { slug: "4" },

                    }}

                    onClick={showModal}
                >
                    <div className="item card">
                        <h5>#4. Demo NFT Item</h5>
                        <Image src={EggPlaceholder} alt="demo.nft-item.4" width="100" height="100" />


                    </div>
                </Link>


                <Link key={5}
                    className='col-4'
                    href={{
                        pathname: '/collection-item-transaction/[slug]',
                        query: { slug: "5" },

                    }}

                    onClick={showModal}
                >
                    <div className="item card">
                        <h5>#5. Demo NFT Item</h5>
                        <Image src={EggPlaceholder} alt="demo.nft-item.5" width="100" height="100" />

                    </div>
                </Link>

                <Link key={6}
                    className='col-4'
                    href={{
                        pathname: '/collection-item-transaction/[slug]',
                        query: { slug: "6" },

                    }}

                    onClick={showModal}
                >
                    <div className="item card">
                        <h5>#6. Demo NFT Item</h5>
                        <Image src={EggPlaceholder} alt="demo.nft-item.6" width="100" height="100" />

                    </div>
                </Link>
            </div>

            <div className="row">
                <Link key={7}
                    className='col-4'
                    href={{
                        pathname: '/collection-item-transaction/[slug]',
                        query: { slug: "7" },

                    }}

                    onClick={showModal}
                >
                    <div className="item card">
                        <h5>#7. Demo NFT Item</h5>
                        <Image src={EggPlaceholder} alt="demo.nft-item.7" width="100" height="100" />

                    </div>
                </Link>

                <Link key={8}
                    className='col-4'
                    href={{
                        pathname: '/collection-item-transaction/[slug]',
                        query: { slug: "8" },

                    }}

                    onClick={showModal}
                >
                    <div className="item card">
                        <h5>#8. Demo NFT Item</h5>
                        <Image src={EggPlaceholder} alt="demo.nft-item.8" width="100" height="100" />

                    </div>
                </Link>

                <Link key={9}
                    className='col-4'
                    href={{
                        pathname: '/collection-item-transaction/[slug]',
                        query: { slug: "9" },

                    }}

                    onClick={showModal}
                >
                    <div className="item card">
                        <h5>#9. Demo NFT Item</h5>
                        <Image src={EggPlaceholder} alt="demo.nft-item.9" width="100" height="100" />

                    </div>
                </Link>

            </div>

            <div className="row">
                <Link key={10}
                    className='col-4'
                    href={{
                        pathname: '/collection-item-transaction/[slug]',
                        query: { slug: "10" },

                    }}

                    onClick={showModal}
                >
                    <div className="item card">
                        <h5>#10. Demo NFT Item</h5>
                        <Image src={EggPlaceholder} alt="demo.nft-item.l0" width="100" height="100" />

                    </div>
                </Link>

                <Link key={11}
                    className='col-4'
                    href={{
                        pathname: '/collection-item-transaction/[slug]',
                        query: { slug: "11" },

                    }}

                    onClick={showModal}
                >
                    <div className="item card">
                        <h5>#11. Demo NFT Item</h5>
                        <Image src={EggPlaceholder} alt="demo.nft-item.l1" width="100" height="100" />

                    </div>
                </Link>

                <Link key={12}
                    className='col-4'
                    href={{
                        pathname: '/collection-item-transaction/[slug]',
                        query: { slug: "12" },

                    }}

                    onClick={showModal}
                >
                    <div className="item card">
                        <h5>#12. Demo NFT Item</h5>
                        <Image src={EggPlaceholder} alt="demo.nft-item.l2" width="100" height="100" />

                    </div>
                </Link>

            </div>

            <div className="row">
                <Link key={13}
                    className='col-4'
                    href={{
                        pathname: '/collection-item-transaction/[slug]',
                        query: { slug: "13" },

                    }}

                    onClick={showModal}
                >
                    <div className="item card">
                        <h5>#13. Demo NFT Item</h5>
                        <Image src={EggPlaceholder} alt="demo.nft-item.l3" width="100" height="100" />

                    </div>
                </Link>

                <Link key={14}
                    className='col-4'
                    href={{
                        pathname: '/collection-item-transaction/[slug]',
                        query: { slug: "14" },

                    }}

                    onClick={showModal}
                >
                    <div className="item card">
                        <h5>#14. Demo NFT Item</h5>
                        <Image src={EggPlaceholder} alt="demo.nft-item.l4" width="100" height="100" />

                    </div>
                </Link>

                <Link key={15}
                    className='col-4'
                    href={{
                        pathname: '/collection-item-transaction/[slug]',
                        query: { slug: "15" },

                    }}

                    onClick={showModal}
                >
                    <div className="item card">
                        <h5>#15. Demo NFT Item</h5>
                        <Image src={EggPlaceholder} alt="demo.nft-item.l5" width="100" height="100" />

                    </div>
                </Link>

            </div>

            <div className="row last">
                <Link key={16}
                    className='col-4'
                    href={{
                        pathname: '/collection-item-transaction/[slug]',
                        query: { slug: "16" },

                    }}

                    onClick={showModal}
                >
                    <div className="item card">
                        <h5>#16. Demo NFT Item</h5>
                        <Image src={EggPlaceholder} alt="demo.nft-item.l6" width="100" height="100" />

                    </div>
                </Link>

                <Link key={17}
                    className='col-4'
                    href={{
                        pathname: '/collection-item-transaction/[slug]',
                        query: { slug: "17" },

                    }}

                    onClick={showModal}
                >
                    <div className="item card">
                        <h5>#17. Demo NFT Item</h5>
                        <Image src={EggPlaceholder} alt="demo.nft-item.l7" width="100" height="100" />

                    </div>
                </Link>

                <Link key={18}
                    className='col-4'
                    href={{
                        pathname: '/collection-item-transaction/[slug]',
                        query: { slug: "18" },

                    }}

                    onClick={showModal}
                >
                    <div className="item card">
                        <h5>#18. Demo NFT Item</h5>
                        <Image src={EggPlaceholder} alt="demo.nft-item.l8" width="100" height="100" />

                    </div>
                </Link>

            </div>


            <Modal isModalVisible={isModalVisible} data={{
                goto: "/cantomon-management",
                title: "Window",
                content: modalContent,
                gotoTitle: "Go to Cantomon"
            }} closeModal={closeModal} showModal={showModal} />

        </div>
    )
}