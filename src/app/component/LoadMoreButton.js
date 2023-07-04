"use client"

import React, { useState } from 'react'
import { getPostList, getPostByTag, getPostByAuthor, getPostBySearch, getPostByCategory } from '../../../lib/query'

const LoadMoreButton = ({ posts, setPosts, type, slug }) => {
    const [buttonText, setButtonText] = useState('Lihat Selengkapnya')
    const [buttonDisabled, setButtonDisabled] = useState(false)

    const handleOnclick = async (e) => {
        let clickedBtn = e.target;

        setButtonText('Memuat...')
        setButtonDisabled(true)

        let updatedPosts = {
            nodes: [],
            pageInfo: {}
        }


        if (type === 'tags') {
            const morePosts = await getPostByTag(slug, posts.pageInfo.endCursor);
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
        } else if (type === 'posts') {
            const morePosts = await getPostList(posts.pageInfo.endCursor);
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
        } else if (type === 'author') {
            const morePosts = await getPostByAuthor(slug, posts.pageInfo.endCursor);
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
        } else if (type === 'search') {
            const morePosts = await getPostBySearch(slug, posts.pageInfo.endCursor);
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
        } else if (type === 'category') {
            const morePosts = await getPostByCategory(slug, posts.pageInfo.endCursor);
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
    }

    return (
        <button className={'block bg-red-600 rounded-md text-white px-4 py-2 my-4 mx-auto'} onClick={handleOnclick} type='button' disabled={buttonDisabled}>
            {buttonText}
        </button>
    )
}

export default LoadMoreButton