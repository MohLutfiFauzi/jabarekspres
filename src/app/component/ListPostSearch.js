"use client"

import useSWR from "swr"
import { request } from "../../../lib/graphql"
import { getPostBySearch } from "../../../lib/queries"
import LoadMoreButton from "./LoadMoreButton"
import Post from "./Post"
import { useEffect, useState } from "react"
import { useSearchParams } from 'next/navigation'

const ListPostSearch = () => {
    const search = useSearchParams()
    const searchQuery = search ? search?.get('q') : null

    const { data, error } = useSWR(getPostBySearch(searchQuery), request);
    const [posts, setPosts] = useState([])

    useEffect(() => {
        if (data && data.posts && data.posts.nodes) {
            setPosts(data.posts.nodes);
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
                    {data?.posts?.nodes.length !== 0 ? (
                        <>
                            <h2 className='font-semibold text-lg'>Pencarian: {searchQuery}</h2>
                            {posts.map((post) => (
                                <Post key={post.slug} {...post}>
                                    {post.title}
                                </Post>
                            ))}
                            <LoadMoreButton posts={posts} setPosts={setPosts} />
                        </>
                    ) : (
                        <h2 className='font-semibold text-lg'>
                            Pencarian dengan kata <span className="text-red-700">{searchQuery}</span> tidak ditemukan
                        </h2>
                    )}
                </>
            ) : (
                <h2 className='font-semibold text-lg'>Loading ...</h2>
            )}
        </>
    )
}

export default ListPostSearch