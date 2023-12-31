import Title from "./Title"
import Tag from "./Tag"
import { getTagsPopular } from '../../../lib/query'

export async function tagList() {
    const tags = await getTagsPopular();

    return tags
}

const Tags = async () => {
    const tags = await tagList()

    return (
        <div>
            <Title>Tag Populer</Title>
            {
                tags.map((tag) => (
                    <Tag key={tag.slug} slug={tag.uri}>{tag.name}</Tag>
                ))
            }
        </div>
    )
}

export default Tags