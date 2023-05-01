// components/layout.js
import Header from "./header";
import Footer from "./footer";

export default function Layout({ children }) {
    return (
        <div className='holder'>
            <div className='main-wrapper'>
                <Header />
                <main>{children}</main>
                <Footer />
            </div>
        </div>
    )
}