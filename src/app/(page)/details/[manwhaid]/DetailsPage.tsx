'use client'

import { useEffect, useState } from "react"
import useManwhaStore from "@/zustand/useManwhaStore"
import useAuthStore from "@/zustand/useAuthStore"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Heart, HeartOff } from 'lucide-react'



const DetailsPage = ({ manwhaid }: { manwhaid: string }) => {
    const { getDetailsData, detailsData } = useManwhaStore()

    const { authUser, getAuthUserFunction } = useAuthStore()

    const [isReversed, setIsReversed] = useState(false)
    const [isLoading, setIsLoading] = useState(true)
    const router = useRouter()

    useEffect(() => {
        const fetchData = async () => {
            setIsLoading(true)
            const data = await getDetailsData({ manwhaid })

            if (data?.error) {
                router.push('/home/1')
                return
            }
            setIsLoading(false)
        }

        fetchData()
    }, [manwhaid])

    const chaptersToShow = isReversed
        ? [...(detailsData?.chapters || [])].reverse()
        : (detailsData?.chapters || [])


    //If the user is authenticated, He can see the Like Manwha
    const likeManwha = async () => {
        try {
            let res = await fetch('/site/LikeManwha', {
                method: "POST",
                body: JSON.stringify({ manwhaId: manwhaid, image: detailsData?.image })
            })
            let data = await res.json()

            //Call tong function na to, para parang real time nagbabago data, pero ni rerefetch lang yung current state nung authUser
            getAuthUserFunction()
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <div className='bg-gray-900 w-full pb-[50px] px-[5%] md:px-[10%] lg:px-[20%] relative'>

            {/* Background Image */}
            <div className='w-screen relative left-1/2 -translate-x-1/2 overflow-hidden '>
                <div className='w-full h-full absolute z-[-50]'>
                    {isLoading ? (
                        <div className="w-full h-full bg-gray-800"></div>
                    ) : (
                        <img
                            src={detailsData?.image}
                            className="w-full h-full object-cover blur-lg"
                        />
                    )}
                </div>

                {/* Header Info */}
                <div className='z-[50] font-bold text-[22px] py-[50px] text-white px-[5%] md:px-[10%] lg:px-[20%] relative'>
                    <div className='w-full h-full rounded-lg gap-[50px] flex items-center justify-around flex-col lg:flex-row'>

                        {/* Poster */}
                        <div className='w-[200px] h-[300px] flex-shrink-0 rounded-lg overflow-hidden'>
                            {!isLoading && (detailsData?.status !== '' && (
                                <div
                                    className={`text-[12px] px-[15px] py-[5px] rounded-lg absolute font-bold ${detailsData?.status === "HOT"
                                        ? "bg-red-500"
                                        : detailsData?.status === "NEW"
                                            ? "bg-yellow-500"
                                            : "bg-gray-500"
                                        }`}
                                >
                                    {detailsData?.status}
                                </div>
                            ))}
                            {isLoading
                                ? <div className="skeleton h-full w-full bg-gray-900"></div>
                                : <img src={detailsData?.image} className='w-full h-full' />

                            }
                        </div>

                        {/* Info */}
                        <div className='min-h-[300px] w-full max-w-[700px] bg-gray-900/80 rounded-lg px-[30px] py-[15px] flex flex-col justify-around'>
                            <div className='text-white font-bold text-[40px]'>
                                {isLoading
                                    ? <span className="skeleton h-11 w-[200px] bg-gray-800 inline-block"></span>
                                    : detailsData?.title
                                }
                            </div>



                            <div className='text-white text-[18px]'>
                                <div className='text-zinc-500'>
                                    <span className="text-white">Alt Name:</span>{" "}
                                    {isLoading
                                        ? <span className="skeleton h-4 w-28 bg-gray-800 inline-block"></span>
                                        : detailsData?.info?.[0]?.["Alt Name"]}
                                </div>
                                <div className='text-zinc-500'>
                                    <span className="text-white">Author:</span>{" "}
                                    {isLoading
                                        ? <span className="skeleton h-4 w-28 bg-gray-800 inline-block"></span>
                                        : detailsData?.info?.[0]?.Author}
                                </div>
                                <div className='text-zinc-500'>
                                    <span className="text-white">Artist:</span>{" "}
                                    {isLoading
                                        ? <span className="skeleton h-4 w-28 bg-gray-800 inline-block"></span>
                                        : detailsData?.info?.[0]?.Artist}
                                </div>
                                <div className='text-zinc-500'>
                                    <span className="text-white">Genre:</span>{" "}
                                    {isLoading
                                        ? <span className="skeleton h-4 w-28 bg-gray-800 inline-block"></span>
                                        : detailsData?.info?.[0]?.Genre?.join(", ")}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Summary Header */}

            <div className='w-[500px]  flex items-center justify-start gap-[20px]'>

                <div className="relative inline-block text-[22px] my-[40px] flex flex-row">
                    <div>
                        <span className="text-white font-bold uppercase">Summary</span>
                        <div className="absolute left-0 right-0 -bottom-1 h-1 bg-[#d7af57] rounded-full"></div>

                    </div>
                </div>

                {authUser && (
                    <div
                        onClick={likeManwha}
                        className={`duration-200 p-[8px] cursor-pointer rounded-lg font-bold text-gray-900 ${authUser.likedManwha?.some((item: any) => item.manwhaId === manwhaid)
                            ? 'bg-gray-500 hover:bg-gray-500/80 '
                            : 'bg-[#d7af57] hover:bg-[#d7af57]/80'
                            }`}
                    >
                        {authUser.likedManwha?.some((item: any) => item.manwhaId === manwhaid) ? (
                            <div className='flex flex-row items-center justify-center gap-[5px]'>
                                Unlike Manwha
                                <HeartOff className="w-5 h-5" />
                            </div>
                        ) : (
                            <div className='flex flex-row items-center justify-center gap-[5px]'>
                                Like Manwha
                                <Heart className="w-5 h-5" />
                            </div>
                        )}
                    </div>
                )}
            </div>


            {/* Summary Text */}
            <div className='text-zinc-500'>
                {isLoading ? (
                    <div className='space-y-4'>
                        <div className="skeleton h-4 w-full bg-gray-800"></div>
                        <div className="skeleton h-4 w-full bg-gray-800"></div>
                        <div className="skeleton h-4 w-full bg-gray-800"></div>
                    </div>
                ) : (
                    detailsData?.summary
                )}
            </div>

            {/* Chapters Header */}
            <div className="relative inline-block text-[22px] mt-[30px]">
                <span className="text-white font-bold uppercase">Chapters</span>
                <div className="absolute left-0 right-0 -bottom-1 h-1 bg-[#d7af57] rounded-full"></div>
            </div>

            {/* Reverse Toggle */}
            <div>
                <button
                    onClick={() => setIsReversed(prev => !prev)}
                    className="py-5 text-zinc-500 cursor-pointer text-black font-semibold rounded hover:text-white transition"
                >
                    {isReversed ? 'Show Normal Order' : 'Show Reversed Order'}
                </button>
            </div>

            {/* Chapter List */}
            {isLoading ? (
                <div className="skeleton h-32 w-full bg-gray-800 rounded-lg mt-4"></div>
            ) : (
                <div className='w-full bg-gray-700/60 p-[15px] grid grid-cols-1 md:grid-cols-2 gap-4 relative rounded-lg'>
                    {chaptersToShow?.map((chapter, index) => (
                        <Link href={`/chapter/${manwhaid}/${chapter?.chapterId}`} key={index} className='rounded-lg overflow-hidden'>
                            <div className='w-full h-[60px] flex items-center flex-col justify-center relative group'>
                                <div className='font-bold group-hover:text-[#d7af57]'>{chapter?.name}</div>
                                <span className='text-[12px] text-zinc-500'>{chapter?.releaseDate}</span>
                            </div>
                            <div className='w-full bg-[#d7af57] h-[3px]'></div>
                        </Link>
                    ))}
                </div>
            )}
        </div>
    )
}

export default DetailsPage
