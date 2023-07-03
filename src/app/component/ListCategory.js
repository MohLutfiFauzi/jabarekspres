"use client"

import useSWR from "swr"
import { request } from "../../../lib/graphql"
import { getPostByCategory } from "../../../lib/queries"
import LoadMoreButton from "./LoadMoreButton"
import Post from "./Post"
import { useEffect, useState } from "react"

const ListCategory = ({ slug }) => {
    const query = getPostByCategory(slug);
    const { data, error } = useSWR(query, request);
    const [posts, setPosts] = useState([])

    useEffect(() => {
        if (data && data.category && data.category.posts) {
            setPosts(data.category.posts);
        }
    }, [data]);

    if (error) {
        return (
            <h2 className='font-semibold text-lg'>
                Terjadi kesalahan saat memuat data
            </h2>
        );
    }

    return (
        <>
            {data ? (
                <>
                    {data.category ? (
                        <>
                            <h2 className='font-semibold text-lg'>Kategori: {data.category.name}</h2>
                            {posts?.nodes?.map((post) => (
                                <Post key={post.slug} {...post}>
                                    {post.title}
                                </Post>
                            ))}
                            <LoadMoreButton posts={posts} setPosts={setPosts} />
                        </>
                    ) : (
                        <h2 className='font-semibold text-lg'>
                            Kategori dengan kata <span className="text-red-700">{slug}</span> tidak ditemukan
                        </h2>
                    )}
                </>
            ) : (
                <h2 className='font-semibold text-lg'>Loading ...</h2>
            )}
        </>
    )
}

export default ListCategory