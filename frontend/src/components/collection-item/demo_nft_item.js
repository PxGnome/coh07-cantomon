import React from "react";
import Link from "next/link";
import Image from "next/image";
import Modal from "../utils/modal";

import EggPlaceholder from "./../../assets/nft-collection/egg-placeholder.png";

import { useDispatch } from "react-redux";
import { getNFtsByWalletAddressFromMoralis } from "@/features/manageCollection";

import EthereumClientContext from "@/utils/ethereum_client_context";
import { chunkArray } from "@/utils/helpers";
import { ethers } from "ethers";
import { NFT_READER_ABI, NFT_READER_CONTRACT, EXPLORER_ADDRESS } from "@/utils/config";

export default function DemoNFTItem(props) {
    const ethereumClient = React.useContext(EthereumClientContext).ethereumClient;
    //const ethersProvider = React.useContext(EthereumClientContext).ethersProvider;
    //const providerWeb3 = React.useContext(EthereumClientContext).provider;
    console.log("EXPLORER_ADDRESS: ", EXPLORER_ADDRESS);
    console.log("EXPLORER_ADDRESS: ", EXPLORER_ADDRESS);
    console.log("EXPLORER_ADDRESS: ", EXPLORER_ADDRESS);
    const [isModalVisible, setModalVisibility] = React.useState(false);
    const [myWalletNfts, setMyWalletNfts] = React.useState("");
    const [nftReader, setNftReader] = React.useState("");
    const [modalContent, setModalContent] = React.useState("");
    const [gotoTitle, setGotoTitle] = React.useState("");
    const [gotoURL, setgotoURL] = React.useState("");
    const [isCustomGotoState, setCustomGotoState] = React.useState(false);
    const [goToCustomFunc, setGoToCustomFunc] = React.useState(undefined);

    const dispatch = useDispatch(); 
    const confirmToPort = async (e, element) => {  
        e.preventDefault();
        const ported = await nftReader.portNft(7701, element.token_address, element.token_id, {value: 1});
        if(ported && 'hash' in ported) {
            setModalContent(
                <>
                    <p>Transaction in Progress.</p>
                    <p>
                        <Link className="external-url" href={`${EXPLORER_ADDRESS}${ported.hash}`} passHref legacyBehavior>
                            <a target="_blank" rel="noopener noreferrer"> Link URL</a>
                        </Link>
                    </p>
                </>
            );
            
           setGotoTitle("Go To Cantomon");
           setCustomGotoState(false);
           setgotoURL("/cantomon-management");
           setGoToCustomFunc(undefined);
        };
        
    }

    const showModal = (e, element) => {
        e.preventDefault(); 
        setModalContent(<>
            <p>{`Are you sure porting ${element.normalized_metadata?.name} [#${element.token_id}] ?`}</p>
            <p><Image fill={false} width={85} height={65} src={'image' in element.normalized_metadata && element.normalized_metadata.image != undefined ? element.normalized_metadata.image : EggPlaceholder} alt={`#${element.token_id}-${element.name}`} /></p>
        </>);
        setgotoURL("#");
        setGotoTitle("Confirm");
        setCustomGotoState(true);
        setGoToCustomFunc({
            func: confirmToPort,
            arg: element
        });
        setModalVisibility(true);
    }
    const closeModal = (e) => {
        e.preventDefault();
        setModalVisibility(false);
    }

    React.useEffect(() => {
        initdata();
    }, [myWalletNfts])

    const initdata = async () => { 
        if (ethereumClient) {
            const wallet_address = ethereumClient.getAccount();
            const wallet_network = ethereumClient.getNetwork();

            if (myWalletNfts == "" && wallet_address && wallet_network) {
                const getNfts = await dispatch(getNFtsByWalletAddressFromMoralis({
                    address: wallet_address?.address,
                    chain: wallet_network?.chain?.network
                }));
                const nftsGroup = chunkArray(getNfts?.payload?.result, 3); 
                const provider = new ethers.providers.Web3Provider(window.ethereum);
                const signer = provider.getSigner(); 
                 
                const nft_contract = new ethers.Contract(NFT_READER_CONTRACT, NFT_READER_ABI, signer); 
                setNftReader(nft_contract);
                setMyWalletNfts(nftsGroup); 
            }
        }
    }

    const modalContentDefault = (
        <>
            <p>Transaction in Progress.</p>
            <p>
                <Link className="external-url" href="#" >Link URL</Link>
            </p>
        </>
    );

    return (
        <div className="container list-group">
            {myWalletNfts != "" ? (

                myWalletNfts.map((elements, index, arrElement) => {
                    return (
                        <div className="row" key={index + "-row"}>
                            {
                                elements.map((el, i, ar) => {
                                    return (
                                        <Link
                                            className='col-4'
                                            key={i + "-col"}
                                            href={{
                                                pathname: '/collection-item-transaction/[slug]',
                                                query: { slug: "1" },

                                            }}

                                            onClick={(e) => showModal(e, el)}
                                        >
                                            <div className="item card">
                                                <h5>{`#${el.token_id} ${el.name}`}</h5>
                                                <Image fill={false} width={85} height={65} src={'image' in el.normalized_metadata && el.normalized_metadata.image != undefined ? el.normalized_metadata.image : EggPlaceholder} alt={`#${el.token_id}-${el.name}-${i}`} />

                                            </div>
                                        </Link>
                                    )
                                })
                            }
                        </div>
                    )
                })


            ) : (
                <div className="row"><h1>No Data</h1></div>
            )
            }

            <Modal isModalVisible={isModalVisible} data={{
                goto: gotoURL,
                title: "Window",
                content: modalContent,
                gotoTitle: gotoTitle,
                isCustomGoto: isCustomGotoState,
                goToCustom: goToCustomFunc,
            }} closeModal={closeModal} showModal={showModal} />

        </div >
    )
}