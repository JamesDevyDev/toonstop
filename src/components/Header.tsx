'use client'
import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import useManwhaStore from '@/zustand/useManwhaStore'
import Drawer from './loading/drawer/Drawer'

//Spacing px-[5%] md:px-[10%] lg:px-[20%]



const Header = () => {

    const { mature, setMature } = useManwhaStore()

    useEffect(() => {
        const fetchCookie = async () => {
            const res = await fetch('/api/matureCookie');
            const data = await res.json();
        }
        fetchCookie()
    }, [])

    const matureSet = async () => {
        const res = await fetch('/api/matureCookie', {
            method: 'POST'
        });
        const data = await res.json();
        setMature(data?.value)

    };

    return (
        <div>
            <div className='w-[100%] h-[90px] bg-[#d7af57] px-[5%] md:px-[10%] lg:px-[20%] relative flex items-center justify-between' >

                <div className='flex items-center justify-center h-full relative'>
                    <div className='h-[100%] w-[150px]'>
                        <Link href='/home/1'>
                            <img src='/assets/logo.png' className='h-[100%] w-[100%] relative' />
                        </Link>

                    </div>

                    <div
                        onClick={() => {
                            matureSet()
                        }}
                        className={`relative cursor-pointer w-[80px] h-[30px]  border  rounded-lg text-[12px] flex items-center justify-center ${mature == 0 ? 'bg-green-500/10 border-green-500 text-green-500' : 'bg-red-500/10 border-red-500 text-red-500'} `}>
                        {`NSFW ${mature == 0 ? 'OFF' : 'ON'}`} •
                    </div>
                </div>

                <div>
                    <Drawer />
                </div>

            </div>
            <div className='w-[100%] h-[10px] bg-black relative'></div>
        </div>
    )
}

export default Header