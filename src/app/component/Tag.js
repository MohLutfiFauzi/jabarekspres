import Link from 'next/link'
import React from 'react'

const Tag = ({ children, slug }) => {
    return (
        <Link href={slug} className='inline-block rounded-md px-2 py-1 bg-gray-300 text-neutral-700 hover:text-red-500 mb-1 mr-2'>{children}</Link>
    )
}

export default Tag