'use client'

import React from 'react'
import useAuthStore from '@/zustand/useAuthStore'
import Link from 'next/link'
import { useEffect } from 'react'

import { useRouter } from 'next/navigation'

const page = () => {
    const router = useRouter()

    const { authUser } = useAuthStore()

    useEffect(() => {
        if (!authUser) {
            router.push('/home/1');
        }
    }, [authUser, router]);

    return (
        <div className='bg-gray-900 w-full pb-[50px] px-[5%] md:px-[10%] lg:px-[20%] min-h-[100vh]'>
            <div className="relative inline-block text-[22px] my-[40px]">
                <div className="w-full grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
                    {authUser?.likedManwha && authUser.likedManwha.length > 0 ? (
                        authUser.likedManwha.map((card: any, index: any) => (
                            <div key={index} className="aspect-[3/5] w-full rounded-md relative flex-shrink-0">
                               

                                <Link href={`/details/${card.manwhaId}`}>
                                    <div className='w-full h-[250px] overflow-hidden rounded-lg group z-[1]'>
                                        <img src={card.image} className='w-full h-full group-hover:scale-110 duration-300' />
                                    </div>
                                </Link>

                                <div className='w-full relative flex items-start justify-center flex-col'>
                                    <Link href={`/details/${card.manwhaId}`} className='truncate w-full'>
                                        <div className='truncate font-bold py-[10px] text-white rounded-sm hover:text-[#d7af57]'>
                                            {card.manwhaId}
                                        </div>
                                    </Link>
                                </div>
                            </div>
                        ))
                    ) : (
                        <div>
                            <p className="text-white font-bold w-full py-2 rounded">No Liked Manwha</p>
                            <Link href="/home/1" className="font-bold mt-4 inline-block text-[#d7af57] underline hover:text-yellow-200">
                                Go back to Home
                            </Link>
                        </div>
                    )}

                </div >
            </div>
        </div>
    )
}

export default page