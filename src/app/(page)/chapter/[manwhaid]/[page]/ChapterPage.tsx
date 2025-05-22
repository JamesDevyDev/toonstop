'use client'

import { useEffect } from "react"
import { useState } from "react"
import useManwhaStore from "@/zustand/useManwhaStore"
import { useRouter } from "next/navigation"

const ChapterPage = ({ manwhaid, page }: { manwhaid: string, page: string }) => {
    const { getChapterData, chapterData } = useManwhaStore()

    const [isLoading, setIsLoading] = useState(true)
    const router = useRouter()

    useEffect(() => {
        const fetchData = async () => {
            setIsLoading(true);
            const data = await getChapterData({ manwhaid, page });
            if (data?.error) {
                router.push(`/details/${manwhaid}`)
                return
            }
            setIsLoading(false);
        };

        fetchData();
    }, [manwhaid, page, getChapterData]);

    return (
        <div className='w-[100%] min-h-[100vh] py-[50px] px-[5%] md:px-[10%] lg:px-[20%] relative bg-gray-900'>

            <div className="relative inline-block text-[22px] mb-[40px]">
                {isLoading ? (

                    <>
                        <span className="skeleton h-8 w-60 bg-gray-800 inline-block rounded"></span>
                        <div className="absolute left-0 right-0 -bottom-1 h-1 bg-[#d7af57] rounded-lg"></div>
                    </>

                ) : (
                    <>
                        <span className="text-white font-bold uppercase">{chapterData?.title}</span>
                        <div className="absolute left-0 right-0 -bottom-1 h-1 bg-[#d7af57] rounded-lg"></div>
                    </>
                )}
            </div>

            <div className="w-screen relative left-1/2 -translate-x-1/2 overflow-hidden px-[0] md:px-[15%] lg:px-[35%]">
                {isLoading ? (
                    Array.from({ length: 5 }).map((_, index) => (
                        <div
                            key={index}
                            className="w-full h-[400px] bg-gray-800 rounded-md skeleton"
                        />
                    ))
                ) : (
                    chapterData?.images.map((img, index) => (
                        <div key={index} className="w-full">
                            <img src={img} alt={`Chapter image ${index + 1}`} className='w-full object-contain' />
                        </div>
                    ))
                )}
            </div>

        </div>
    )
}

export default ChapterPage
