'use client'

import { useEffect, useState } from "react"
import useManwhaStore from "@/zustand/useManwhaStore"
import HomeCards from "@/components/home/HomeCards"

import HomeCardsLoading from "@/components/loading/home/HomeCardsLoading"

const HomePage = ({ page }: { page: string }) => {

    const [loading, setLoading] = useState<boolean>(true)
    const { getHomeData, homeData, mature } = useManwhaStore()

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true)
            await getHomeData({ page });
            setLoading(false)
        }

        fetchData()

    }, [page, getHomeData, mature]);


    return (
        <div className='bg-gray-900  w-[100%] pb-[50px] px-[5%] md:px-[10%] lg:px-[20%] '>

            <div className="relative inline-block text-[22px] my-[40px]">
                <span className="text-white font-bold uppercase">Latest Releases</span>
                <div className="absolute left-0 right-0 -bottom-1 h-1 bg-[#d7af57] rounded-full"></div>
            </div>

            {loading ? <HomeCardsLoading /> : <HomeCards />}


        </div>
    )
}

export default HomePage