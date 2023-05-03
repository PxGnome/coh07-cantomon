import Link from "next/link";
import Image from "next/image";
import EggPlaceholder from "./../../assets/nft-collection/egg-placeholder.png";
export default function DemoNFTCollection() {
    return (
        <div className="list-group">

            <Link key={1}
                className='row'
                href={{

                    pathname: '/collection-item/[slug]',
                    query: { slug: "1" },

                }}
            >

                <div className='col-4 image-wrapper index'>
                    <div className='image-placeholder'>
                        <Image src={EggPlaceholder} alt="Placeholder" width={100} height={100} />
                    </div>
                </div>
                <div className='col-8 text-wrapper'>
                    <h4>NFT Demo #1</h4>
                    <div className='description'>
                         Symbol: Demo1 <br />
                         Token Address: 0x00000000000000000000demo1 
                    </div>
                </div>
            </Link>
            <Link key={2}
                className='row'
                href={{

                    pathname: '/collection-item/[slug]',
                    query: { slug: "2" },

                }}
            >

                <div className='col-4 image-wrapper index'>
                    <div className='image-placeholder'>
                        <Image src={EggPlaceholder} alt="Placeholder" width={100} height={100} />
                    </div>
                </div>
                <div className='col-8 text-wrapper'>
                    <h4>NFT Demo #2</h4>
                    <div className='description'>
                         Symbol: Demo1 <br />
                         Token Address: 0x00000000000000000000demo1 
                    </div>
                </div>
            </Link>
            <Link key={3}
                className='row'
                href={{

                    pathname: '/collection-item/[slug]',
                    query: { slug: "3" },

                }}
            >

                <div className='col-4 image-wrapper index'>
                    <div className='image-placeholder'>
                        <Image src={EggPlaceholder} alt="Placeholder" width={100} height={100} />
                    </div>
                </div>
                <div className='col-8 text-wrapper'>
                    <h4>NFT Demo #3</h4>
                    <div className='description'>
                         Symbol: Demo1 <br />
                         Token Address: 0x00000000000000000000demo1 
                    </div>
                </div>
            </Link>
            <Link key={4}
                className='row'
                href={{

                    pathname: '/collection-item/[slug]',
                    query: { slug: "4" },

                }}
            >

                <div className='col-4 image-wrapper index'>
                    <div className='image-placeholder'>
                        <Image src={EggPlaceholder} alt="Placeholder" width={100} height={100} />
                    </div>
                </div>
                <div className='col-8 text-wrapper'>
                    <h4>NFT Demo #4</h4>
                    <div className='description'>
                         Symbol: Demo1 <br />
                         Token Address: 0x00000000000000000000demo1 
                    </div>
                </div>
            </Link>
            <Link key={5}
                className='row'
                href={{

                    pathname: '/collection-item/[slug]',
                    query: { slug: "5" },

                }}
            >

                <div className='col-4 image-wrapper index'>
                    <div className='image-placeholder'>
                        <Image src={EggPlaceholder} alt="Placeholder" width={100} height={100} />
                    </div>
                </div>
                <div className='col-8 text-wrapper'>
                    <h4>NFT Demo #5</h4>
                    <div className='description'>
                         Symbol: Demo1 <br />
                         Token Address: 0x00000000000000000000demo1 
                    </div>
                </div>
            </Link>
            <Link key={6}
                className='row'
                href={{

                    pathname: '/collection-item/[slug]',
                    query: { slug: "6" },

                }}
            >

                <div className='col-4 image-wrapper index'>
                    <div className='image-placeholder'>
                        <Image src={EggPlaceholder} alt="Placeholder" width={100} height={100} />
                    </div>
                </div>
                <div className='col-8 text-wrapper'>
                    <h4>NFT Demo #6</h4>
                    <div className='description'>
                         Symbol: Demo1 <br />
                         Token Address: 0x00000000000000000000demo1 
                    </div>
                </div>
            </Link>
            <Link key={7}
                className='row'
                href={{

                    pathname: '/collection-item/[slug]',
                    query: { slug: "7" },

                }}
            >

                <div className='col-4 image-wrapper index'>
                    <div className='image-placeholder'>
                        <Image src={EggPlaceholder} alt="Placeholder" width={100} height={100} />
                    </div>
                </div>
                <div className='col-8 text-wrapper'>
                    <h4>NFT Demo #7</h4>
                    <div className='description'>
                         Symbol: Demo1 <br />
                         Token Address: 0x00000000000000000000demo1 
                    </div>
                </div>
            </Link>
            <Link key={8}
                className='row'
                href={{

                    pathname: '/collection-item/[slug]',
                    query: { slug: "8" },

                }}
            >

                <div className='col-4 image-wrapper index'>
                    <div className='image-placeholder'>
                        <Image src={EggPlaceholder} alt="Placeholder" width={100} height={100} />
                    </div>
                </div>
                <div className='col-8 text-wrapper'>
                    <h4>NFT Demo #8</h4>
                    <div className='description'>
                         Symbol: Demo1 <br />
                         Token Address: 0x00000000000000000000demo1 
                    </div>
                </div>
            </Link>
            <Link key={9}
                className='row'
                href={{

                    pathname: '/collection-item/[slug]',
                    query: { slug: "9" },

                }}
            >

                <div className='col-4 image-wrapper index'>
                    <div className='image-placeholder'>
                        <Image src={EggPlaceholder} alt="Placeholder" width={100} height={100} />
                    </div>
                </div>
                <div className='col-8 text-wrapper'>
                    <h4>NFT Demo #9</h4>
                    <div className='description'>
                         Symbol: Demo1 <br />
                         Token Address: 0x00000000000000000000demo1 
                    </div>
                </div>
            </Link>
        </div>
    )
}