"use client"

import useSWR from "swr"
import { request } from "../../../lib/graphql"
import { getPostByAuthor } from "../../../lib/queries"
import LoadMoreButton from "./LoadMoreButton"
import Post from "./Post"
import { useEffect, useState } from "react"

const ListPostAuthor = ({ slug }) => {
    const query = getPostByAuthor(slug);
    const { data, error } = useSWR(query, request);
    const [posts, setPosts] = useState([])

    useEffect(() => {
        if (data && data.user && data.user.posts) {
            setPosts(data.user.posts);
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
                    {data.user ? (
                        <>
                            <h2 className='font-semibold text-lg'>Penulis: {data.user.name}</h2>
                            {posts?.nodes?.map((post) => (
                                <Post key={post.slug} {...post}>
                                    {post.title}
                                </Post>
                            ))}
                            <LoadMoreButton posts={posts} setPosts={setPosts} />
                        </>
                    ) : (
                        <h2 className='font-semibold text-lg'>
                            Penulis dengan kata <span className="text-red-700">{slug}</span> tidak ditemukan
                        </h2>
                    )}
                </>
            ) : (
                <h2 className='font-semibold text-lg'>Loading ...</h2>
            )}
        </>
    )
}

export default ListPostAuthor