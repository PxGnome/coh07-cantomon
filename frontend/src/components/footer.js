// components/footer.js
import React from "react";
import Link from "next/link";

export default function Footer() {
    return (
        <footer>
            <nav className="navbar">
                <div className="container-fluid">
                    <div className="left">
                        <div className="row">
                            <Link className='main menu-btn' href='#'><i className='bi bi-list st'></i></Link>
                        </div>
                    </div>
                    <div className="center">
                        <div className="row action-menu">
                            <Link className='manage' href='/'>Manage</Link>
                            <Link className='battle' href='/'>Battle</Link>
                            <Link className='shop' href='/'>Shop</Link>
                        </div>
                    </div>
                    <div className="right">
                        <div className="row">
                            <Link className='extra-menu menu-btn' href='/'><i className='bi bi-three-dots st' /></Link>
                        </div>
                    </div>
                </div>
            </nav>
        </footer>
    )
}