'use client'
import React, { useState } from 'react'
import Link from 'next/link'
import useManwhaStore from '@/zustand/useManwhaStore'

//Spacing px-[5%] md:px-[10%] lg:px-[20%]



const Header = () => {

    const mature = useManwhaStore((state) => state.mature)
    const setMature = useManwhaStore((state) => state.setMature)

    return (
        <div>
            <div className='w-[100%] h-[90px] bg-[#d7af57] px-[5%] md:px-[10%] lg:px-[20%] relative flex items-center justify-start' >

                <div className='h-[100%] w-[150px] '>
                    <Link href='/home/1'>
                        <img src='/assets/logo.png' className='h-[100%] w-[100%] relative' />
                    </Link>

                </div>

                <div
                    onClick={() => {
                        const newValue = mature === 1 ? 0 : 1
                        setMature(newValue)
                        console.log('Mature set to:', newValue)
                    }}
                    className={`cursor-pointer w-[80px] h-[30px]  border  rounded-lg text-[12px] flex items-center justify-center ${!mature ? 'bg-green-500/10 border-green-500 text-green-500' : 'bg-red-500/10 border-red-500 text-red-500'} `}>
                    {`NSFW ${!mature ? 'OFF' : 'ON'}`} •
                </div>

            </div>
            <div className='w-[100%] h-[10px] bg-black relative'></div>
        </div>
    )
}

export default Header