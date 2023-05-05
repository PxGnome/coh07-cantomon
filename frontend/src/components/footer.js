// components/footer.js
import React from "react";
import Link from "next/link";

import { useSelector } from "react-redux";

export default function Footer() {

    const current_page = useSelector((state) => state?.navStore.current_page);

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
                            <Link className='portal' href='/portal'>Portal</Link>
                            <Link className='manage' href='/cantomon-management'>Manage</Link>
                            <Link className='dojo' href='/cantomon-management/dojo'>Dojo</Link>
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