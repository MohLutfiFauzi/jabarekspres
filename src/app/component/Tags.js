"use client"

import useSWR from "swr"
import { request } from "../../../lib/graphql"
import { getTagsPopular } from "../../../lib/queries"
import Title from "./Title"
import { useEffect, useState } from "react"
import Tag from "./Tag"

const Tags = () => {
    const query = getTagsPopular();
    const { data, error } = useSWR(query, request);

    const [tags, setTags] = useState([])

    useEffect(() => {
        if (data && data.tags && data.tags.nodes) {
            setTags(data.tags.nodes);
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
        <div>
            <Title>Tag Populer</Title>
            {tags.length !== 0 ? (
                <>
                    {
                        tags.map((tag) => (
                            <Tag key={tag.slug} slug={tag.uri}>{tag.name}</Tag>
                        ))
                    }
                </>
            ) : (<h2 className='font-semibold text-lg'>Loading ...</h2>)
            }
        </div>
    )
}

export default Tags