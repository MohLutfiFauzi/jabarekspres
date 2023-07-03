import React from 'react'
import Layout from '../component/Layout'
import ListPostSearch from '../component/ListPostSearch'

const SearchPage = () => {
    return (
        <Layout>
            <div className='m-3'>
                <ListPostSearch />
            </div>
        </Layout>
    )
}

export default SearchPage