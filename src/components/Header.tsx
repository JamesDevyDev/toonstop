import React from 'react'
import Link from 'next/link'

//Spacing px-[5%] md:px-[10%] lg:px-[20%]


const Header = () => {
    return (
        <div>
            <div className='w-[100%] h-[90px] bg-[#d7af57] px-[5%] md:px-[10%] lg:px-[20%] relative'>

                <div className='h-[100%] w-[150px]'>
                    <Link href='/home/1'>
                        <img src='/assets/logo.png' className='h-[100%] w-[100%] relative' />
                    </Link>
                </div>
            </div>
            <div className='w-[100%] h-[10px] bg-black relative'></div>
        </div>
    )
}

export default Header