'use client'
import React from 'react'
import { Menu } from '@headlessui/react'
import { HiChevronDown } from 'react-icons/hi2'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

export default function Dropdowns({ menu }) {
    const pathname = usePathname()

    return (
        <Menu as="div" className="relative inline-block text-left">
            <div>
                <Menu.Button className="inline-flex w-full justify-center bg-red-500 px-2 py-3 text-white hover:bg-red-600">
                    {menu.title}
                    <HiChevronDown className="h-5 w-5 ml-1.5 mt-1 text-gray-300" aria-hidden="true" />
                </Menu.Button>
            </div>

            <Menu.Items className="absolute left-0 z-10 w-36 origin-top-right bg-red-500 shadow-lg ">
                {
                    menu.children.map(menuItem => {
                        return (
                            <Menu.Item key={menuItem.key}>
                                <Link href={menuItem.uri} className={`${pathname}/` === menuItem.uri ? 'px-2 py-2 w-full inline-block hover:bg-red-600 bg-red-600' : 'px-2 py-2 w-full inline-block hover:bg-red-600'}>{menuItem.title}</Link>
                            </Menu.Item>
                        )
                    })
                }
            </Menu.Items>
        </Menu>
    )
}
