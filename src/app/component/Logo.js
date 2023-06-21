import React from 'react'
import Icon from '/public/images/rakcer-logo.png'
import Image from 'next/image'

const Logo = () => {
    return (
        <Image src={Icon} alt='logo rakcer' className='hidden mx-auto md:block my-9 lg:mx-0' />
    )
}

export default Logo