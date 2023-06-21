import Footer from "./Footer"
import Logo from "./Logo"
import NavBar from "./NavBar"
import NavbarMobile from "./NavbarMobile"
import PopularNews from "./PopularNews"
import SearchBar from "./SearchBar"
import Tag from "./Tag"
import Title from "./Title"
import Link from 'next/link'
import { getPostList, getTagsPopular, getMenuPrimary, getMenuFooter } from '../lib/query'

export async function postsList() {
    const posts = await getPostList();

    return posts
}

export async function allPopularTags() {
    const tags = await getTagsPopular();

    return tags
}

export async function allMenuPrimary() {
    const menusPrimary = await getMenuPrimary();

    return menusPrimary
}

export async function allMenuFooter() {
    const menuFooter = await getMenuFooter();

    return menuFooter
}

const Layout = async ({ children }) => {
    const [posts, tags, menusPrimary, menuFooter] = await Promise.all([postsList(), allPopularTags(), allMenuPrimary(), allMenuFooter()])
    const limitedPosts = posts.slice(0, 5)

    return (
        <main >
            <SearchBar />
            <Link href='/' className='inline-block'>
                <Logo />
            </Link>
            <NavBar menus={menusPrimary} />
            <NavbarMobile menus={menusPrimary} />
            <div className="lg:flex">
                <div className="flex-auto max-w-3xl">
                    {children}
                </div>
                <div className="ml-4 mt-3 max-w-md">
                    <div >
                        <Title>Tag Populer</Title>
                        {
                            tags.map((tag) => (
                                <Tag key={tag.slug} slug={tag.uri}>{tag.name}</Tag>
                            ))
                        }
                    </div>
                    <div className="sticky top-14">
                        <Title className="mt-5">Berita Populer</Title>
                        {
                            limitedPosts.map((post) => (
                                <PopularNews key={post.slug} {...post} />
                            ))
                        }
                    </div>
                </div>
            </div>
            <Footer menus={menuFooter} />
        </main>
    )
}

export default Layout