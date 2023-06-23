"use client"

import Image from 'next/image'
import Link from 'next/link'
import moment from 'moment'
import 'moment-duration-format'

const PostPopularNews = ({ title, slug, featuredImage, date }) => {
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
        <div className='flex mb-4 mr-2'>
            {
                featuredImage.node.mediaDetails.sizes[0].sourceUrl ?
                    <Link href={slug} as={`/${slug}`} className='mr-2' >
                        <div className='relative w-20 h-20 md:w-32 md:h-32 lg:h-20 lg:w-20'>
                            <Image style={{ objectFit: 'cover' }} src={featuredImage.node.mediaDetails.sizes[0]?.sourceUrl} fill sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" preload="true" placeholder="blur" blurDataURL={featuredImage.node.mediaDetails.sizes[0]?.sourceUrl} alt={featuredImage.node.altText ? featuredImage.node.altText : 'image'} />
                        </div>
                    </Link> :
                    null
            }
            <div>
                <Link href={slug} as={`/${slug}`} className='text-base font-semibold text-slate-950 hover:text-red-500'>{title}</Link>
                <p className='text-xs my-2'>{formattedDuration}</p>
            </div>
        </div>
    )
}

export default PostPopularNews