'use client'

import Image from 'next/image';
import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { Navigation, Pagination } from "swiper";
import iklan from '/public/images/iklan.png'
import Link from 'next/link';

const Carousel = () => {
    return (
        <Swiper
            spaceBetween={30}
            autoplay={{ delay: 3000 }}
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
        >
            <SwiperSlide >
                <div className="relative">
                    <Image src={iklan} alt="Gambar 1" />
                    <div className="absolute bottom-0 left-0 w-full h-full bg-gradient-to-t from-black to-transparent"></div>
                    <Link href={'/'} className="absolute text-white left-0 bottom-8 ml-3 mb-3 font-semibold text-3xl hover:text-red-700">Warga Mekarjaya Kesulitan Air Bersih, Beli Air Rp60.000 untuk Kebutuhan Selama Dua Hari</Link>
                    <p className="absolute text-white left-0 bottom-0 ml-3 mb-3 font-semibold">5 jam lalu</p>
                </div>
            </SwiperSlide>
            <SwiperSlide >
                <div className="relative">
                    <Image src={iklan} alt="Gambar 1" />
                    <div className="absolute bottom-0 left-0 w-full h-full bg-gradient-to-t from-black to-transparent"></div>
                    <Link href={'/'} className="absolute text-white left-0 bottom-10 ml-3 mb-3 font-semibold text-3xl hover:text-red-700">Warga Mekarjaya Kesulitan Air Bersih, Beli Air Rp60.000 untuk Kebutuhan Selama Dua Hari</Link>
                    <p className="absolute text-white left-0 bottom-0 ml-3 mb-3">5 jam lalu</p>
                </div>
            </SwiperSlide>
        </Swiper>
    );
};

export default Carousel;
