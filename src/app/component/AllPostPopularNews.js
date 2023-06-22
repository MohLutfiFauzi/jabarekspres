import React from 'react'
import PostPopularNews from './PostPopularNews'
import Title from './Title'
import { getPostList } from '../../../lib/query'

export async function postsList() {
    const posts = await getPostList();

    return posts
}

const AllPostPopularNews = async () => {
    const posts = await postsList()
    const limitedPosts = posts.slice(0, 5)

    return (
        <div className="sticky top-14">
            <Title className="mt-5">Berita Populer</Title>
            {
                limitedPosts.map((post) => (
                    <PostPopularNews key={post.slug} {...post} />
                ))
            }
        </div>
    )
}

export default AllPostPopularNews