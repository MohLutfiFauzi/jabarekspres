"use client"

import Image from 'next/image'
import Link from 'next/link'
import defaultImage from './../../../public/images/default.jpg'
import { useEffect, useState } from 'react'
import { getFormattedDuration } from '../../../lib/utils'

const Post = ({ title, excerpt, slug, featuredImage, date }) => {

    const [formattedDuration, setFormattedDuration] = useState('')

    useEffect(() => {
        const duration = getFormattedDuration(date);
        setFormattedDuration(duration);
    }, [date])

    return (
        <div className='flex mt-4'>
            {
                featuredImage?.node?.mediaDetails?.sizes[0]?.sourceUrl ?
                    <Link href={slug} className='mr-2 mb-4' as={`/${slug}`}>
                        <div className='relative w-20 h-20 md:w-32 md:h-32 lg:w-44 lg:h-44 '>
                            <Image src={featuredImage.node.mediaDetails.sizes[0]?.sourceUrl} fill sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" style={{ objectFit: 'cover' }} preload="true" placeholder="blur" blurDataURL={featuredImage.node.mediaDetails.sizes[0]?.sourceUrl} alt={featuredImage.node.altText} />
                        </div>
                    </Link>
                    :
                    <Link href={slug} className='mr-2 mb-4' as={`/${slug}`}>
                        <div className='relative w-20 h-20 md:w-32 md:h-32 lg:w-44 lg:h-44 '>
                            <Image src={defaultImage} fill sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" style={{ objectFit: 'cover' }} preload="true" placeholder="blur" alt='default image' />
                        </div>
                    </Link>
            }
            <div>
                <Link href={slug} as={`/${slug}`} className='text-base md:text-2xl font-semibold hover:text-red-500'>{title}</Link>
                <p className='text-xs my-2'>{formattedDuration}</p>
                <div className='hidden md:block text-base' dangerouslySetInnerHTML={{ __html: excerpt }}></div>
            </div>
        </div>
    )
}

export default Post