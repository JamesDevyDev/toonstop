import React, { useEffect, useState } from 'react'
import { Menu } from 'lucide-react'
import useManwhaStore from '@/zustand/useManwhaStore'
import useAuthStore from '@/zustand/useAuthStore'

import Link from 'next/link'


const Drawer = () => {

    const [isLoadingViews, setIsLoadingViews] = useState(false)
    const [isLoadingReads, setIsLoadingReads] = useState(false)



    const { visitCount, readCount, getVisitCount, getReadCount } = useManwhaStore()
    const { authUser, getAuthUserFunction, LogoutFunction} = useAuthStore()

    useEffect(() => {
        const fetchCounts = async () => {
            setIsLoadingViews(true);
            setIsLoadingReads(true);
            await getVisitCount();
            await getReadCount();
            setIsLoadingViews(false);
            setIsLoadingReads(false);
        };
        getAuthUserFunction()
        fetchCounts();
    }, []);

    return (
        <div className="drawer">
            <input id="my-drawer" type="checkbox" className="drawer-toggle" />
            <div className="drawer-content">
                <label htmlFor="my-drawer" className="btn bg-black drawer-button">
                    <Menu size={20} color={'#d7af57'} />
                </label>
            </div>
            <div className="drawer-side z-[50]">
                <label htmlFor="my-drawer" aria-label="close sidebar" className="drawer-overlay"></label>
                <ul className="menu bg-[#d7af57] text-base-content min-h-full w-80 p-4 ">

                    <div className='w-full h-[80px] flex items-center justify-center'>
                        <div className='w-[50%] h-full'>
                            <img src='/assets/logo.png' className='h-full w-full relative' />
                        </div>
                    </div>

                    <div className='h-[100px] w-full flex items-center justify-center gap-[10px]'>
                        <div className='w-[100px] h-[100px] rounded-lg border-2 border-black/70 bg-black/50 text-black relative flex items-center justify-center flex-col'>
                            {
                                isLoadingViews
                                    ? <span className="loading loading-spinner loading-lg text-[#d7af57]"></span>
                                    : <>
                                        <div className='font-bold text-[25px] text-[#d7af57]'>
                                            {visitCount}
                                        </div>
                                        <div className='font-bold text-[11px]'>
                                            VISIT COUNT
                                        </div>
                                    </>
                            }
                        </div>

                        <div className='w-[100px] h-[100px] rounded-lg border-2 border-black/70 bg-black/50 text-black relative flex items-center justify-center flex-col'>
                            {
                                isLoadingReads
                                    ? <span className="loading loading-spinner loading-lg text-[#d7af57]"></span>
                                    : <>
                                        <div className='font-bold text-[25px] text-[#d7af57]'>
                                            {readCount}
                                        </div>
                                        <div className='font-bold text-[11px]'>
                                            READ COUNT
                                        </div>
                                    </>
                            }
                        </div>
                    </div>

                    {!authUser &&
                        <div className='w-full h-[100px]  flex items-center justify-center gap-[10px] flex-row'>
                            <Link href='/auth/register' className='w-[100px] h-[30px] flex items-center justify-center rounded-md bg-black/50 border-2 text-black hover:bg-[#d7af57] cursor-pointer hover:font-bold'>
                                Register
                            </Link>
                            <Link href='/auth/login' className='w-[100px] h-[30px] flex items-center justify-center rounded-md bg-black/50 border-2 text-black hover:bg-[#d7af57] cursor-pointer hover:font-bold'>
                                Login
                            </Link>
                        </div>
                    }

                    {authUser && 
                    <div>
                        Welcome {authUser?.username}

                        <div onClick={()=> LogoutFunction()}>Logout</div>
                    </div>}



                </ul>
            </div>
        </div>
    )
}

export default Drawer
