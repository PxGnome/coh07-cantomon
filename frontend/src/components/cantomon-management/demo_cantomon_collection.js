import React from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from 'next/router';
import Creatures3 from "./../../assets/cantomon/creatures3.png";

export default function DemoCantomonCollection() {
    return (
        <div className="container list-group">
            <Link key={1} className="row" href="#">
                <div className="col-4 image-wrapper">
                    <Image src={Creatures3} alt="creatures cantomon" />
                </div>
                <div className="col-8 text-wrapper">
                    <h2 className="title">Metamon #1</h2>
                    <div className="description">
                        <p>Metamon ....a....</p>
                        <p>Metamon ....b....</p>
                        <p>Metamon ....c....</p>
                    </div>
                </div>

            </Link>
            <Link key={2} className="row" href="#">
                <div className="col-4 image-wrapper">
                    <Image src={Creatures3} alt="creatures cantomon" />
                </div>
                <div className="col-8 text-wrapper">
                    <h2 className="title">Metamon #2</h2>
                    <div className="description">
                        <p>Metamon ....a....</p>
                        <p>Metamon ....b....</p>
                        <p>Metamon ....c....</p>
                    </div>
                </div>

            </Link>
            <Link key={3} className="row" href="#">
                <div className="col-4 image-wrapper">
                    <Image src={Creatures3} alt="creatures cantomon" />
                </div>
                <div className="col-8 text-wrapper">
                    <h2 className="title">Metamon #3</h2>
                    <div className="description">
                        <p>Metamon ....a....</p>
                        <p>Metamon ....b....</p>
                        <p>Metamon ....c....</p>
                    </div>
                </div>

            </Link>
            <Link key={4} className="row" href="#">
                <div className="col-4 image-wrapper">
                    <Image src={Creatures3} alt="creatures cantomon" />
                </div>
                <div className="col-8 text-wrapper">
                    <h2 className="title">Metamon #4</h2>
                    <div className="description">
                        <p>Metamon ....a....</p>
                        <p>Metamon ....b....</p>
                        <p>Metamon ....c....</p>
                    </div>
                </div>

            </Link>
            <Link key={53} className="row" href="#">
                <div className="col-4 image-wrapper">
                    <Image src={Creatures3} alt="creatures cantomon" />
                </div>
                <div className="col-8 text-wrapper">
                    <h2 className="title">Metamon #5</h2>
                    <div className="description">
                        <p>Metamon ....a....</p>
                        <p>Metamon ....b....</p>
                        <p>Metamon ....c....</p>
                    </div>
                </div>

            </Link>
            <Link key={6} className="row" href="#">
                <div className="col-4 image-wrapper">
                    <Image src={Creatures3} alt="creatures cantomon" />
                </div>
                <div className="col-8 text-wrapper">
                    <h2 className="title">Metamon #6</h2>
                    <div className="description">
                        <p>Metamon ....a....</p>
                        <p>Metamon ....b....</p>
                        <p>Metamon ....c....</p>
                    </div>
                </div>

            </Link>
            <Link key={7} className="row" href="#">
                <div className="col-4 image-wrapper">
                    <Image src={Creatures3} alt="creatures cantomon" />
                </div>
                <div className="col-8 text-wrapper">
                    <h2 className="title">Metamon #7</h2>
                    <div className="description">
                        <p>Metamon ....a....</p>
                        <p>Metamon ....b....</p>
                        <p>Metamon ....c....</p>
                    </div>
                </div>

            </Link>
            <Link key={8} className="row" href="#">
                <div className="col-4 image-wrapper">
                    <Image src={Creatures3} alt="creatures cantomon" />
                </div>
                <div className="col-8 text-wrapper">
                    <h2 className="title">Metamon #8</h2>
                    <div className="description">
                        <p>Metamon ....a....</p>
                        <p>Metamon ....b....</p>
                        <p>Metamon ....c....</p>
                    </div>
                </div>

            </Link>
            <Link key={9} className="row" href="#">
                <div className="col-4 image-wrapper">
                    <Image src={Creatures3} alt="creatures cantomon" />
                </div>
                <div className="col-8 text-wrapper">
                    <h2 className="title">Metamon #9</h2>
                    <div className="description">
                        <p>Metamon ....a....</p>
                        <p>Metamon ....b....</p>
                        <p>Metamon ....c....</p>
                    </div>
                </div>

            </Link>
        </div>
    )
}