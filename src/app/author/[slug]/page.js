import Layout from '@/app/component/Layout'
import React from 'react'
import { getPostByAuthor } from "../../../../lib/query"
import Post from '@/app/component/Post'
import SecondaryButton from '@/app/component/LoadMoreButton'

export const dynamic = 'force-dynamic'

const Author = async ({ params }) => {
    const posts = await getPostByAuthor(params.slug)

    if (!posts) {
        return (
            <Layout>
                <div className='m-3'>Penulis tidak ada</div>
            </Layout>
        )
    }


    return (
        <Layout>
            <div className='m-3'>
                <h2 className='font-semibold text-lg'>Penulis : {params.slug}</h2>
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

export default Author