import React from 'react'
import Search from './Search'
import PrimaryButton from './PrimaryButton'
import dynamic from 'next/dynamic'
const DateNow = dynamic(() => import('./DateNow'), { ssr: false })

const SearchBar = () => {
    return (
        <div className='hidden md:flex justify-between bg-white items-center py-1 px-10 shadow-md sticky top-0 z-10 w-full'>
            <DateNow />
            <Search />
            <PrimaryButton />
        </div>
    )
}

export default SearchBar