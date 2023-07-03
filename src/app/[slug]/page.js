import React from 'react'
import Layout from "../component/Layout"
import defaultImage from "../../../public/images/default.jpg"
import Link from 'next/link'
import Image from 'next/image'
import { getSinglePost, getForMetadata, getStaticPage } from "../../../lib/query"
import Tag from '../component/Tag'
import moment from 'moment'

export async function generateMetadata({ params }) {
    const metadata = await getForMetadata(params.slug)

    return {
        title: metadata?.title ? metadata.title : 'Rakcer',
        description: metadata?.excerpt ? metadata.excerpt : 'Rakcer'
    }
}


const Blog = async ({ params }) => {
    const post = await getSinglePost(params.slug)
    const staticPage = await getStaticPage(params.slug)

    if (staticPage) {
        return (
            <Layout>
                <div className='m-3'>
                    <div>
                        <Link href={'/'}>Beranda </Link>
                        <span>&gt;&gt; </span>
                        <span>{staticPage.title}</span>
                    </div>
                    <h1 className='text-3xl text-red-700 text-center font-semibold my-6'>{staticPage.title}</h1>
                    <div dangerouslySetInnerHTML={{ __html: staticPage.content }} className='post-content' />
                </div>
            </Layout>
        )
    }

    if (!post) {
        return (
            <Layout>
                <div className='m-3'>Artikel tidak ada</div>
            </Layout>
        )
    }

    const { title, author, tags, modified, featuredImage, categories, content } = post

    const formattedDate = moment(modified).locale('id').format('DD - MM - YYYY - h:mm A');

    return (
        <Layout>
            <div className='m-3'>
                <div>
                    <Link href={'/'}>Beranda </Link>
                    <span>&gt;&gt; </span>
                    <Link href={`${categories.nodes[0].uri}`}>{categories.nodes[0].name} </Link>
                    <span>&gt;&gt; {title}</span>
                </div>
                <h1 className='text-3xl text-red-700 text-center font-semibold my-6'>{title}</h1>
                <div className='flex justify-between mb-2'>
                    <Link href={`${author.node.uri}`} className='inline-block text-red-700'>{author.node.name}</Link>
                    <p>{formattedDate}</p>
                </div>
                {
                    featuredImage?.node?.mediaDetails?.sizes[0]?.sourceUrl ?
                        <Image src={featuredImage.node.mediaDetails.sizes[0].sourceUrl} alt={featuredImage.node.altText} width={800} height={300} style={{ height: 'auto' }} className='object-cover object-top' />
                        :
                        <Image src={defaultImage} alt="image" className='mb-5' width={800} />
                }
                <div dangerouslySetInnerHTML={{ __html: content }} className='post-content mt-3' />
                <hr className='mt-4 mb-2' />
                <div className='flex flex-wrap'>
                    <p>Tag: &nbsp;</p>
                    {
                        tags.nodes.length !== 0 ?
                            tags.nodes.map(tag => (
                                <Tag slug={tag.uri} key={tag.slug}>{tag.name}</Tag>
                            )) : null
                    }
                </div>
            </div>
        </Layout>
    )
}

export default Blog