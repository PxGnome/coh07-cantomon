// components/layout.js
import Header from "./header";
import Footer from "./footer";
import { useSelector } from "react-redux"; 

export default function Layout({ children }) {
    const current_page = useSelector((state) => state?.navStore.current_page);
    const SCROLLPAGE = [
        "",
        "/collection-item/[slug]"
    ]
    return (
        <div className='holder'>
            <div className='main-wrapper'>
                <Header />
                <main>
                    <div className="left">&nbsp;</div>
                    <div className={
                        current_page in SCROLLPAGE ? ("center") : ("center no-scroll")
                    }>
                        {children}
                    </div>
                    <div className="right">&nbsp;</div>
                </main>
                <Footer />
            </div>
        </div>
    )
}