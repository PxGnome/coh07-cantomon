// components/header.js
import React from "react";
import Link from "next/link";
import Image from "next/image";
import Logo from "./../assets/logo.png";

export default function Header() {
    return (
        <header>
            <nav className="navbar">
                <div className="container-fluid">
                    <div className="left">
                        <Link className='info menu-btn' href='#'><i className='bi bi-info'></i></Link>
                    </div>
                    <div className="center">
                        <Image src={Logo} className="logo" alt="logo cantomon" />
                    </div>
                    <div className="right">
                        <button className="btn btn-primary">Wallet Connection</button>
                    </div>
                </div>
            </nav>
        </header>
    )
}