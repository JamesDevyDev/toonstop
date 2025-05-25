'use client'

import React, { useEffect, useState } from 'react'
import useCommentStore from '@/zustand/useCommentStore'
import SuggestionsComponent from '@/components/forum/Suggestion'
import Link from 'next/link'

const Page = () => {
    const { getLatestComment, ForumComments } = useCommentStore()

    const [choice, setChoice] = useState<string>('comment')
    const [loading, setLoading] = useState<boolean>(true)

    useEffect(() => {
        const fetchComments = async () => {
            setLoading(true)
            await getLatestComment()
            setLoading(false)
        }

        setTimeout(() => {
            fetchComments()
        },1000)
    }, [])

    return (
        <div className='bg-gray-900 w-full pb-[50px] px-[5%] md:px-[10%] lg:px-[20%] min-h-[100vh]'>
            <div className="relative inline-block text-[22px] my-[40px] w-full">
                <div className='flex items-center justify-center gap-[50px] lg:gap-[100px] flex-col lg:flex-row lg:items-start'>
                    <div className='w-[20%] text-[18px] font-bold text-white gap-[10px] flex items-center justify-start flex-col'>
                        <div onClick={() => setChoice('comment')} className={`cursor-pointer w-[200px] h-[50px] flex items-center justify-center rounded-full ${choice === 'comment' ? 'bg-[#d7af57]' : 'bg-gray-500/70'}`}>Latest Comments</div>
                        <div onClick={() => setChoice('suggestions')} className={`cursor-pointer w-[200px] h-[50px] flex items-center justify-center rounded-full ${choice === 'suggestions' ? 'bg-[#d7af57]' : 'bg-gray-500/70'}`}>Suggestions</div>
                    </div>

                    <div className='w-[100%] lg:w-[80%] min-h-[300px] rounded-lg flex items-center justify-start gap-[5px] flex-col'>

                        {choice === 'comment' && loading && (
                            <>
                                {[...Array(3)].map((_, i) => (
                                    <div key={i} className="bg-gray-600/40 animate-pulse rounded-xl p-4 w-full text-sm space-y-3">
                                        <div className="h-4 bg-gray-500 rounded w-[40%]"></div>
                                        <div className="h-3 bg-gray-500 rounded w-[90%]"></div>
                                        <div className="h-3 bg-gray-500 rounded w-[80%]"></div>
                                        <div className="flex items-center gap-2 mt-2">
                                            <div className="w-6 h-6 rounded-full bg-gray-500"></div>
                                            <div className="h-3 bg-gray-500 rounded w-[30%]"></div>
                                        </div>
                                    </div>
                                ))}
                            </>
                        )}

                        {choice === 'comment' && !loading && ForumComments?.map((comment:any, index:any) => (
                            <div
                                key={index}
                                className="bg-gray-500/70 rounded-xl p-4 shadow-md w-full text-sm"
                            >
                                <div className="flex items-center text-blue-400 space-x-2 mb-2">
                                    <Link href={`/details/${comment?.manwhaId}`} className='cursor-pointer underline'>{comment?.manwhaId}</Link>
                                    <span className="text-gray-400">•</span>
                                    <span className="text-gray-400">
                                        {new Date(comment?.createdAt).toLocaleString([], {
                                            year: 'numeric',
                                            month: 'short',
                                            day: 'numeric',
                                            hour: '2-digit',
                                            minute: '2-digit',
                                            hour12: true,
                                        })}
                                    </span>
                                </div>

                                <p className="text-gray-300 text-sm mb-3">{comment?.text}</p>

                                <div className="flex justify-between items-center">
                                    <div className="flex items-center gap-2">
                                        <img
                                            src={comment?.commenterId.avatar}
                                            alt="avatar"
                                            className="w-6 h-6 rounded-full object-cover"
                                        />
                                        <span className="text-yellow-400 text-sm font-medium">
                                            {comment?.commenterId?.username}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        ))}

                        {choice === 'suggestions' && <SuggestionsComponent />}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Page
