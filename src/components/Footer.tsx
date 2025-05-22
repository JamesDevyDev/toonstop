import React from 'react'
import Link from 'next/link'

const Footer = () => {
    return (
        <div>
            <div className='w-[100%] h-[10px] bg-black relative'></div>
            <div className='w-[100%] h-[130px] bg-[#d7af57] px-[5%] md:px-[10%] lg:px-[20%] relative flex'>


                <div className='h-[100%] w-[150px] flex-shrink-0 flex'>
                    <Link href='/home/1'>
                        <img src='/assets/logo.png' className='h-[100%] w-[100%] relative' />
                    </Link>
                </div>
                <div className='h-full flex items-center justify-center w-full'>
                    <p className='text-sm text-gray-700'>
                        This site doesn't store any data from third-party services.
                    </p>
                </div>

            </div>
        </div>
    )
}

export default Footer