"use client"
import Link from 'next/link'
import React from 'react'
import Dropdowns from './Dropdowns'
import { usePathname } from 'next/navigation'
import { getMenuPrimary } from '../../../lib/query'


export async function allMenuPrimary() {
    const menusPrimary = await getMenuPrimary();

    return menusPrimary
}

const NavBar = async () => {
    const pathname = usePathname()
    const menus = await allMenuPrimary()

    return (
        <nav className='hidden bg-red-500 text-white sticky top-0 z-20 md:block'>
            {
                menus.map((menu) => {
                    const isActive = pathname === '/' ? '/' : `${pathname}/`

                    if (menu.children.length === 0) {
                        return (
                            <Link href={menu.uri} className={isActive === menu.uri ? 'px-2 py-3 inline-block bg-red-600 hover:bg-red-600' : 'px-2 py-3 inline-block hover:bg-red-600'} key={menu.key}>{menu.title}</Link>
                        )
                    } else {
                        return (
                            <Dropdowns menu={menu} key={menu.key} />
                        )
                    }
                })
            }
        </nav>
    )
}

export default NavBar