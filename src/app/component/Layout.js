import Footer from "./Footer"
import Logo from "./Logo"
import NavBar from "./NavBar"
import NavbarMobile from "./NavbarMobile"
import SearchBar from "./SearchBar"
import Tags from "./Tags"
import Link from 'next/link'
import AllPostPopularNews from "./AllPostPopularNews"

const Layout = ({ children }) => {
    return (
        <main >
            <SearchBar />
            <Link href='/' className='inline-block'>
                <Logo />
            </Link>
            <NavBar />
            <NavbarMobile />
            <div className="lg:flex">
                <div className="flex-auto max-w-3xl">
                    {children}
                </div>
                <div className="ml-4 mt-3 max-w-md">
                    <Tags />
                    <AllPostPopularNews />
                </div>
            </div>
            <Footer />
        </main>
    )
}

export default Layout