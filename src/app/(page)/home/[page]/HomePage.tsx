'use client'
import { useEffect, useState } from "react"
import useManwhaStore from "@/zustand/useManwhaStore"
import HomeCards from "@/components/home/HomeCards"
import HomeCardsLoading from "@/components/loading/home/HomeCardsLoading"
import Link from "next/link"
import { useRouter } from "next/navigation"


const HomePage = ({ page }: { page: string }) => {
    const router = useRouter()
    const [loading, setLoading] = useState<boolean>(true)
    const { getHomeData, mature, pagination, getVisitCount } = useManwhaStore()

    // homepage add count
    useEffect(() => {
        let addVisitCount = async () => {
            let res = await fetch('/site/count/visit', {
                method: 'POST'
            })
        }
        addVisitCount()
        getVisitCount()
    }, [])

    let currentPage = parseInt(page)

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true)
            const data = await getHomeData({ page })
            if (data?.error) {
                router.push('/home/1')
                return
            }
            setLoading(false)
        }

        fetchData()
    }, [page, getHomeData, mature])

    return (
        <div className='bg-gray-900 w-full pb-[50px] px-[5%] md:px-[10%] lg:px-[20%]'>
            <div className="relative inline-block text-[22px] my-[40px]">
                <span className="text-white font-bold uppercase">Latest Releases</span>
                <div className="absolute left-0 right-0 -bottom-1 h-1 bg-[#d7af57] rounded-full"></div>
            </div>

            {loading ? <HomeCardsLoading /> : <HomeCards />}

            <div className='w-full flex justify-end gap-[2px] mt-[50px]'>
                {pagination?.map((page, index) => (
                    <Link href={`/home/${page}`} className={`px-[20px] py-[10px]  cursor-pointer font-bold text-gray-400 hover:text-white hover:bg-[#d7af57] duration-200 ${currentPage === page && 'bg-[#d7af57] text-white'} `} key={index}>{page}</Link>
                ))}
            </div>
        </div>
    )
}

export default HomePage
