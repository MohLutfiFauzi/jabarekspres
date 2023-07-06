'use client'
import { use } from 'react'

import Image from 'next/image'
import React, { useState } from 'react'
import logo from '/public/images/rakcer-logo.png'
import { HiBars3, HiXMark, HiChevronDown, HiChevronUp, HiMagnifyingGlass } from 'react-icons/hi2'
import Link from 'next/link'
import { getMenuPrimary } from '../../../lib/query'
import Search from './Search'


export async function allMenuPrimary() {
    const menusPrimary = await getMenuPrimary();

    return menusPrimary
}

const menuPrimaryPromise = getMenuPrimary()

const NavbarMobile = () => {
    const [toggle, setToggle] = useState(false)
    const [toggleSubMenu, setToggleSubMenu] = useState(false)
    const [toggleSearch, setToggleSearch] = useState(false)
    const menus = use(menuPrimaryPromise)

    const handleToggle = () => {
        setToggle(!toggle);
    };

    const handleToggleSubMenu = () => {
        setToggleSubMenu(!toggleSubMenu);
    };

    const handleToggleSearch = () => {
        setToggleSearch(!toggleSearch);
    };

    return (
        <>
            <div className='sticky top-0 z-10 bg-white border shadow-sm p-4 flex justify-between md:hidden'>
                {
                    toggle ?
                        <HiXMark className="text-gray-700 text-4xl cursor-pointer" onClick={handleToggle} />
                        :
                        <HiBars3 className="text-gray-700 text-4xl cursor-pointer" onClick={handleToggle} />
                }
                <Link href='/'>
                    <Image src={logo} width={172} height={40} style={{ objectFit: 'cover' }} alt='logo rakcer' />
                </Link>
                {
                    toggleSearch ?
                        <HiXMark className="text-gray-700 text-4xl cursor-pointer" onClick={handleToggleSearch} />
                        :
                        <HiMagnifyingGlass className="text-gray-700 text-4xl cursor-pointer" onClick={handleToggleSearch} />

                }
            </div>

            {
                toggleSearch ?
                    <div className='sticky top-16 z-10 w-full bg-red-500 p-2 md:hidden'>
                        <Search />
                    </div> :
                    null
            }

            {
                toggle ?
                    <nav className={`sticky  ${toggleSearch ? 'top-28' : 'top-16'} z-10 md:hidden`}>
                        {
                            menus.map((menu) => {
                                if (menu.children.length === 0) {
                                    return (
                                        <Link href={menu.uri} className='px-2 py-2 w-full inline-block text-white font-semibold bg-red-500 hover:bg-red-600' key={menu.key}>{menu.title}</Link>
                                    )
                                } else {
                                    return (
                                        <div key={menu.key} >
                                            <div className='flex justify-between px-2 py-2 w-full  text-white font-semibold bg-red-500 hover:bg-red-600 cursor-pointer' onClick={handleToggleSubMenu}>
                                                {
                                                    menu.title
                                                }
                                                {
                                                    toggleSubMenu ?
                                                        <HiChevronUp className="text-white text-2xl" />
                                                        :
                                                        <HiChevronDown className="text-white text-2xl" />
                                                }
                                            </div>
                                            {
                                                toggleSubMenu ?
                                                    menu.children.map(menuItem => (
                                                        <Link key={menuItem.key} href={menuItem.uri} className='px-2 py-2 w-full inline-block text-white font-semibold bg-red-500 hover:bg-red-600 '>{menuItem.title}</Link>
                                                    ))
                                                    :
                                                    null
                                            }
                                        </div>
                                    )
                                }
                            })
                        }
                    </nav>
                    :
                    null
            }
        </>
    )
}

export default NavbarMobile