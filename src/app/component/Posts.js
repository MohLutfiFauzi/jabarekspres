"use client"

import { use, useState } from 'react'
import { getPostList } from '../../../lib/query'
import LoadMoreButton from './LoadMoreButton';
import Post from './Post';

export async function postsList() {
    const allPosts = await getPostList();

    return allPosts
}

export const revalidate = 60

const postsPromise = postsList()


const Posts = () => {
    const allPostsPromise = use(postsPromise)
    const [posts, setPosts] = useState(allPostsPromise)
    return (
        <>
            {
                posts.nodes.map((post) => (
                    <Post key={post.slug} {...post}>{post.title}</Post>
                ))
            }
            <LoadMoreButton posts={posts} setPosts={setPosts} />
        </>
    )
}

export default Posts