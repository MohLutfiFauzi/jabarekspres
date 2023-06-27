"use client"

import React, { useState } from 'react'
import { getPostList } from '../../../lib/query'

const LoadMoreButton = ({ posts, setPosts }) => {
    const [buttonText, setButtonText] = useState('Lihat Selengkapnya')
    const [buttonDisabled, setButtonDisabled] = useState(false)

    const handleOnclick = async (e) => {
        let clickedBtn = e.target;

        setButtonText('Memuat...')
        setButtonDisabled(true)

        const morePosts = await getPostList(posts.pageInfo.endCursor);

        let updatedPosts = {
            pageInfo: {

            },
            nodes: []
        }

        updatedPosts.pageInfo = morePosts.pageInfo;

        posts.nodes.map((node) => {
            updatedPosts.nodes.push(node);
        })

        morePosts.nodes.map((node) => {
            updatedPosts.nodes.push(node);
        })

        setPosts(updatedPosts)

        if (morePosts.pageInfo.hasNextPage) {
            setButtonText('Lihat Selengkapnya')
            setButtonDisabled(false)
        } else {
            setButtonText('Tidak ada lagi post')
            setButtonDisabled(true)
        }
    }

    return (
        <button className='block bg-red-600 rounded-md text-white px-4 py-2 my-4 mx-auto' onClick={handleOnclick} type='button' disabled={buttonDisabled}>
            {buttonText}
        </button>
    )
}

export default LoadMoreButton