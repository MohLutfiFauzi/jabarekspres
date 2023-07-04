"use client"

import useSWR from "swr"
import { request } from "../../../lib/graphql"
import { getPostList } from "../../../lib/queries"
import LoadMoreButton from "./LoadMoreButton"
import Post from "./Post"
import { useEffect, useState } from "react"

const Posts = () => {
    const query = getPostList();
    const { data, error } = useSWR(query, request);
    const [posts, setPosts] = useState([])

    useEffect(() => {
        if (data && data.posts) {
            setPosts(data.posts);
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
                    {data.posts ? (
                        <>
                            {posts?.nodes?.map((post) => (
                                <Post key={post.slug} {...post}>
                                    {post.title}
                                </Post>
                            ))}
                            <LoadMoreButton posts={posts} setPosts={setPosts} type={'posts'} />
                        </>
                    ) : (
                        <h2 className='font-semibold text-lg'>
                            Tag dengan kata <span className="text-red-700">{slug}</span> tidak ditemukan
                        </h2>
                    )}
                </>
            ) : (
                <h2 className='font-semibold text-lg'>Loading ...</h2>
            )}
        </>
    )
}

export default Posts