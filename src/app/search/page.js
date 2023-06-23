"use client"

import React from 'react'
import Layout from '../component/Layout'
import { useSearchParams } from 'next/navigation'
import { getPostBySearch } from "../../../lib/query"
import SecondaryButton from '../component/LoadMoreButton'
import Post from '../component/Post'

const SearchPage = async () => {
    const search = useSearchParams()
    const searchQuery = search ? search?.get('q') : null

    const posts = await getPostBySearch(searchQuery)

    if (!posts) {
        return (
            <Layout>
                <div className='m-3'>Pencarian tidak ada</div>
            </Layout>
        )
    }

    return (
        <Layout>
            <div className='m-3'>
                <h2 className='font-semibold text-lg'>Pencarian : {searchQuery}</h2>
                {
                    posts.map((post) => (
                        <Post key={post.slug} {...post}>{post.title}</Post>
                    ))
                }
                <SecondaryButton />
            </div>
        </Layout>
    )
}

export default SearchPage