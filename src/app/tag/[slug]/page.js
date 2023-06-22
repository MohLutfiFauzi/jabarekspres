import Layout from '@/app/component/Layout'
import React from 'react'
import { getPostByTag } from "../../../../lib/query"
import Post from '@/app/component/Post'
import SecondaryButton from '@/app/component/LoadMoreButton'

const Tag = async ({ params }) => {
    const posts = await getPostByTag(params.slug)
    const modifiedString = params.slug.replace(/-/g, " ")

    if (!posts) {
        return (
            <Layout>
                <div className='m-3'>Tag tidak ada</div>
            </Layout>
        )
    }


    return (
        <Layout>
            <div className='m-3'>
                <h2 className='font-semibold text-lg'>Tag : {modifiedString}</h2>
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

export default Tag