import Layout from '@/app/component/Layout'
import React from 'react'
import ListPostCategory from '@/app/component/ListPostCategory'

export const revalidate = 60

const Kategori = ({ params }) => {
    return (
        <Layout>
            <div className='m-3'>
                <ListPostCategory slug={params.slug} />
            </div>
        </Layout>
    )
}

export default Kategori