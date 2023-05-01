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
                    {
                        current_page == "" && (
                            <div className="center">
                                <div className="row action-menu">
                                    <Link className='manage' href='/'>Manage</Link>
                                    <Link className='battle' href='/'>Battle</Link>
                                    <Link className='shop' href='/'>Shop</Link>
                                </div>
                            </div>
                        )
                    }


                    {
                        current_page == "/collection-item/[slug]" && (
                            <div className="center">
                                <div className="row action-menu">
                                    <Link className='back' href='/'>Back</Link>
                                    <Link className='select' href='/'>Select</Link>
                                </div>
                            </div>
                        )
                    }

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