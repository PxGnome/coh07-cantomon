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
                        <div className="row logo-wrapper">
                            <Image src={Logo} className="logo" alt="logo cantomon" />
                        </div>
                        <div className="row menu-wrapper">
                            <Link className='main menu' href='#'><i className='bi bi-list'></i></Link>
                            <Link className='info menu' href='#'><i className='bi bi-info'></i></Link>
                        </div>
                    </div>
                    <div className="center">
                         
                    </div>
                    <div className="right">
                        <button className="btn btn-primary">Wallet Connection</button>
                    </div>
                </div>
            </nav>
        </header>
    )
}