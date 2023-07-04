"use client"

import Image from 'next/image'
import Link from 'next/link'
import moment from 'moment'
import defaultImage from './../../../public/images/default.jpg'
import 'moment-duration-format'
import { useEffect, useState } from 'react'

const Post = ({ title, excerpt, slug, featuredImage, date }) => {

    const [formattedDuration, setFormattedDuration] = useState('')

    useEffect(() => {
        const postDate = moment(date);
        const currentDate = moment();

        const duration = moment.duration(currentDate.diff(postDate));
        const secondsAgo = duration.asSeconds();
        const minutesAgo = duration.asMinutes();
        const hoursAgo = duration.asHours();
        const daysAgo = duration.asDays();

        let formattedDuration;
        if (secondsAgo < 60) {
            formattedDuration = moment
                .duration(secondsAgo, 'seconds')
                .format('s [detik yang lalu]');
        } else if (minutesAgo < 60) {
            formattedDuration = moment
                .duration(minutesAgo, 'minutes')
                .format('m [menit yang lalu]');
        } else if (hoursAgo < 24) {
            formattedDuration = moment
                .duration(hoursAgo, 'hours')
                .format('h [jam yang lalu]');
        } else {
            formattedDuration = moment
                .duration(daysAgo, 'days')
                .format('D [hari yang lalu]');
        }

        setFormattedDuration(formattedDuration);
    }, [date]);

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