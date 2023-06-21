import Image from 'next/image'
import React from 'react'
import ad from '/public/images/iklan.png'

const Ad = () => {
    return (
        <Image className='mx-auto' src={ad} alt="iklan" width='700' />
    )
}

export default Ad