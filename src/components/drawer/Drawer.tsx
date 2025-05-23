import React, { useEffect, useState } from 'react'
import { Menu } from 'lucide-react'

import useManwhaStore from '@/zustand/useManwhaStore'

const Drawer = () => {

    const [isLoadingViews, setIsLoadingViews] = useState(false)
    const [isLoadingReads, setIsLoadingReads] = useState(false)



    const { visitCount, readCount, getVisitCount, getReadCount } = useManwhaStore()

    useEffect(() => {
        const fetchCounts = async () => {
            setIsLoadingViews(true);
            setIsLoadingReads(true);
            await getVisitCount();
            await getReadCount();
            setIsLoadingViews(false);
            setIsLoadingReads(false);
        };

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

                </ul>
            </div>
        </div>
    )
}

export default Drawer
