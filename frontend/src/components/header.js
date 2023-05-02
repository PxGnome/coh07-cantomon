// components/header.js
import React from "react";
import Link from "next/link";
import Image from "next/image";
import Logo from "./../assets/logo.png";

import { Web3Button, Web3NetworkSwitch } from '@web3modal/react';
export default function Header() {
    return (
        <header>
            <nav className="navbar">
                <div className="container-fluid">
                    <div className="left">
                        <Link className='info menu-btn' href='#'><i className='bi bi-info'></i></Link>
                    </div>
                    <div className="center">
                        <Link href="/"><Image src={Logo} className="logo" alt="logo cantomon" /></Link>
                    </div>
                    <div className="right">
                        <div className='connect-wallet-wrapper'>
                            <Web3Button />
                        </div>
                    </div>
                </div>
            </nav>
        </header>
    )
}