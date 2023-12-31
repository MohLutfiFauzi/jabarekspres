"use client"

import useSWR from "swr"
import { request } from "../../../lib/graphql"
import { getPostByTag } from "../../../lib/queries"
import LoadMoreButton from "./LoadMoreButton"
import Post from "./Post"
import { useEffect, useState } from "react"

const ListPostTags = ({ slug }) => {
    const query = getPostByTag(slug);
    const { data, error } = useSWR(query, request);
    const [posts, setPosts] = useState([])

    useEffect(() => {
        if (data && data.tag && data.tag.posts) {
            setPosts(data.tag.posts);
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
                    {data.tag ? (
                        <>
                            <h2 className='font-semibold text-lg'>Tag: {data.tag.name}</h2>
                            {posts?.nodes?.map((post) => (
                                <Post key={post.slug} {...post}>
                                    {post.title}
                                </Post>
                            ))}
                            <LoadMoreButton posts={posts} setPosts={setPosts} type={'tags'} slug={slug} />
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

export default ListPostTags