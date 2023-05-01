// components/layout.js
import Header from "./header";
import Footer from "./footer";

export default function Layout({ children }) {
    return (
        <div className='holder'>
            <div className='main-wrapper'>
                <Header />
                <main>
                    <div className="left">&nbsp;</div>
                    <div className="center">
                        {children}
                    </div>
                    <div className="right">&nbsp;</div>
                </main>
                <Footer />
            </div>
        </div>
    )
}