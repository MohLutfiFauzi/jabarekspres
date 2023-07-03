import Layout from '@/app/component/Layout'
import React from 'react'
import ListPostAuthor from '@/app/component/ListPostAuthor'

export const revalidate = 60

const Author = ({ params }) => {
    return (
        <Layout>
            <div className='m-3'>
                <ListPostAuthor slug={params.slug} />
            </div>
        </Layout>
    )
}

export default Author