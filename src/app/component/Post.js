"use client"

import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import moment from 'moment'
import 'moment-duration-format'

const Post = ({ title, excerpt, slug, featuredImage, date }) => {
    const postDate = moment(date)
    const currentDate = moment()

    const duration = moment.duration(currentDate.diff(postDate));
    // Menghitung selisih waktu dalam menit, jam, atau hari
    const minutesAgo = duration.asMinutes();
    const hoursAgo = duration.asHours();
    const daysAgo = duration.asDays();

    // Menentukan format waktu berdasarkan selisih waktu
    let formattedDuration;
    if (minutesAgo < 60) {
        formattedDuration = moment.duration(minutesAgo, 'minutes').format('m [menit yang lalu]');
    } else if (hoursAgo < 24) {
        formattedDuration = moment.duration(hoursAgo, 'hours').format('h [jam yang lalu]');
    } else {
        formattedDuration = moment.duration(daysAgo, 'days').format('D [hari yang lalu]');
    }

    return (
        <div className='flex mt-4'>
            {
                featuredImage.node.mediaDetails.sizes[0].sourceUrl ?
                    <Link href={slug} className='mr-2 mb-4'>
                        <div className='relative w-20 h-20 md:w-32 md:h-32 lg:w-44 lg:h-44 '>
                            <Image src={featuredImage.node.mediaDetails.sizes[0]?.sourceUrl} fill sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" style={{ objectFit: 'cover' }} preload="true" placeholder="blur" blurDataURL={featuredImage.node.mediaDetails.sizes[0]?.sourceUrl} alt={featuredImage.node.altText ? featuredImage.node.altText : 'image'} />
                        </div>
                    </Link>
                    :
                    null
            }
            <div>
                <Link href={slug} className='text-base md:text-2xl font-semibold hover:text-red-500'>{title}</Link>
                <p className='text-xs my-2'>{formattedDuration}</p>
                <div className='hidden md:block text-base' dangerouslySetInnerHTML={{ __html: excerpt }}></div>
            </div>
        </div>
    )
}

export default Post