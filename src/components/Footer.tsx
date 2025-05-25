import React from 'react'
import Link from 'next/link'
import { Github } from 'lucide-react';


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
                <div className='h-full flex items-center justify-between w-full'>
                    <div className='flex items-center justify-center flex-col'>
                        <Link
                            title='https://github.com/JamesDevyDev'
                            href='https://github.com/JamesDevyDev'
                            className='w-[35px] h-[35px] bg-gray-900 rounded-lg flex items-center justify-center cursor-pointer'
                        >
                            <Github color={'#d7af57'} />
                        </Link>
                        <div className='text-[9px] text-center text-black mt-[5px]'>
                            show love by following my github.
                        </div>
                    </div>


                </div>



            </div>
        </div>
    )
}

export default Footer