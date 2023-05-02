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
                        <p>Symbol: Demo1</p>
                        <p>Token Address: 0x00000000000000000000demo1</p>
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
                        <p>Symbol: Demo2</p>
                        <p>Token Address: 0x00000000000000000000demo2</p>
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
                        <p>Symbol: Demo3</p>
                        <p>Token Address: 0x00000000000000000000demo3</p>
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
                        <p>Symbol: Demo4</p>
                        <p>Token Address: 0x00000000000000000000demo4</p>
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
                        <p>Symbol: Demo5</p>
                        <p>Token Address: 0x00000000000000000000demo5</p>
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
                        <p>Symbol: Demo6</p>
                        <p>Token Address: 0x00000000000000000000demo6</p>
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
                        <p>Symbol: Demo7</p>
                        <p>Token Address: 0x00000000000000000000demo7</p>
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
                        <p>Symbol: Demo8</p>
                        <p>Token Address: 0x00000000000000000000demo8</p>
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
                        <p>Symbol: Demo9</p>
                        <p>Token Address: 0x00000000000000000000demo9</p>
                    </div>
                </div>
            </Link>
        </div>
    )
}