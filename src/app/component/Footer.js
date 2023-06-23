"use client"
import { use } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React from 'react'
import { getMenuFooter } from '../../../lib/query'

async function allMenuFooter() {
    const menuFooter = await getMenuFooter();

    return menuFooter
}

const menuFooterPromise = allMenuFooter()


const Footer = () => {
    const pathname = usePathname()
    const menus = use(menuFooterPromise)

    return (
        <footer className='mt-3 p-2 bg-gray-200 flex flex-col justify-center items-center px-4 md:flex-row-reverse md:justify-between'>
            <nav className='flex flex-wrap justify-center'>
                {menus.map((menu) => {
                    return (
                        <Link
                            className={`${pathname}/` === menu.uri ? 'text-xs md:text-base py-1 px-2 bg-gray-300' : 'text-xs md:text-base py-1 px-2 '}
                            href={menu.uri}
                            key={menu.key}
                        >
                            {menu.title}
                        </Link>
                    );
                })}
            </nav>
            <p className='text-xs mt-2 md:text-base md:mt-0'>Copyright © 2023 Rakcer.ID - All right reserved</p>
        </footer>
    )
}

export default Footer