import Layout from '@/app/component/Layout'
import React from 'react'
import ListCategory from '@/app/component/ListCategory'

export const revalidate = 60

const Kategori = ({ params }) => {
    return (
        <Layout>
            <div className='m-3'>
                <ListCategory slug={params.slug} />
            </div>
        </Layout>
    )
}

export default Kategori