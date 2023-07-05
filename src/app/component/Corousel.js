'use client'

import useSWR from "swr"
import { request } from "../../../lib/graphql"
import { getPostHeadline } from "../../../lib/queries"
import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import SwiperCore, { Navigation, Pagination, Autoplay } from "swiper";
import Link from 'next/link';
import { getFormattedDuration } from '../../../lib/utils';

SwiperCore.use([Navigation, Pagination, Autoplay])

const Carousel = () => {
    const query = getPostHeadline();
    const { data } = useSWR(query, request);
    const [posts, setPosts] = useState([])

    useEffect(() => {
        if (data && data.categories && data.categories.edges && data.categories.edges[0] && data.categories.edges[0].node && data.categories.edges[0].node.posts && data.categories.edges[0].node.posts.edges) {
            setPosts(data.categories.edges[0].node.posts.edges);
        }
    }, [data]);

    return (
        <Swiper
            spaceBetween={30}
            modules={[Navigation, Pagination]}
            effect="coverflow"
            coverflowEffect={{
                rotate: 0,
                stretch: 0,
                depth: 100,
                modifier: 1,
                slideShadows: false,
            }}
            navigation={true}
            pagination={{ clickable: true }}
            className='mySwiper'
            loop={true}
            autoplay={{ delay: 5000, disableOnInteraction: false }}
        >
            {
                posts.map((post) => (
                    <SwiperSlide key={post?.node?.id}>
                        <div className="relative">
                            <div className='relative w-full h-64 md:h-[26rem]'>
                                <Image src={post?.node?.featuredImage?.node?.sourceUrl} fill sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" style={{ objectFit: 'cover' }} preload="true" placeholder="blur" blurDataURL={post?.node?.featuredImage?.node?.sourceUrl} alt={post?.node?.featuredImage?.node?.altText} />
                            </div>
                            <div className="absolute bottom-0 left-0 w-full h-full bg-gradient-to-t from-gray-950 to-transparent"></div>
                            <Link href={post?.node?.uri} className="absolute text-white left-0 bottom-14 ml-5 mr-5 md:mb-1  font-semibold text-lg md:text-3xl hover:text-red-700">{post?.node?.title}</Link>
                            <p className="absolute text-gray-300 left-0 bottom-3 ml-5 mb-5 text-sm md:text-base">{getFormattedDuration(post?.node?.date)}</p>
                        </div>
                    </SwiperSlide>
                ))
            }
        </Swiper>
    );
};

export default Carousel;
