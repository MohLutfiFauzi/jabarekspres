import Layout from '@/app/component/Layout'
import React from 'react'
import ListPostTags from '@/app/component/ListPostTags'

export const revalidate = 60

const Tag = ({ params }) => {
    return (
        <Layout>
            <div className='m-3'>
                <ListPostTags slug={params.slug} />
            </div>
        </Layout>
    )
}

export default Tag