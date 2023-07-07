"use client"

import { useRouter } from 'next/navigation'
import React, { useState } from 'react'
import { AiOutlineSearch } from "react-icons/ai"

const Search = () => {
    const [searchQuery, setSearchQuery] = useState("")
    const router = useRouter();

    const onSearch = (e) => {
        e.preventDefault()

        const encodeSearchQuery = encodeURI(searchQuery)
        router.push(`/search?q=${encodeSearchQuery}`)

    }

    return (
        <form className="relative w-full md:w-80" onSubmit={onSearch}>
            <input className='border border-gray-300 rounded-full px-4 py-1 w-full' type='text' placeholder='Cari Berita ...' value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} />
            <button type="submit" className="absolute top-0 bottom-0 my-auto right-3 bg-transparent border-none cursor-pointer">
                <AiOutlineSearch className="w-6 h-6 shadow-black" />
            </button>
        </form>
    )
}

export default Search