import Layout from '@/app/component/Layout'
import React from 'react'
import { getPostBySlug } from "../../../../lib/query"
import Post from '@/app/component/Post'
import SecondaryButton from '@/app/component/LoadMoreButton'


export default async function Kategori({ params }) {
    const [posts, nameCategory] = await getPostBySlug(params.slug)

    if (!posts) {
        return (
            <Layout>
                <div className='m-3'>Kategori tidak ada</div>
            </Layout>
        )
    }

    return (
        <Layout>
            <div className='m-3'>
                <h2 className='font-semibold text-lg'>Kategori : {nameCategory}</h2>
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