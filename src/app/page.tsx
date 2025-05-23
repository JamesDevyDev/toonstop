'use client'
import { useEffect } from "react";
import Link from "next/link";
import useManwhaStore from "@/zustand/useManwhaStore"


//Color palletes
//yellow - #d7af57
//black - black

export default function Home() {
  const { getVisitCount } = useManwhaStore()

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

  return (
    <div className='h-[100vh] w-[100vw] overflow-x-hidden bg-black relative '>

      <img src='assets/ass1.png' className='w-[100%] h-[100%] object-cover object-right absolute blur-[4px] md:blur-[1px] ' />

      <div className='relative w-full h-[400px] md:w-[600px]  md:h-[600px]'>
        <img src='assets/logo.png' className='w-[100%] h-[100%]' />

        <div className='relative w-full h-[200px] flex items-center flex-col'>


          <div className='w-[300px] h-[80px] bg-black rounded-lg relative'>
            <Link href='/home/1' className='bg-[#d7af57] text-black w-[300px] h-[80px] flex items-center justify-center font-bold text-[32px] rounded-lg top-[-10%] absolute left-[-2%]'>
              Read Manwha
            </Link>
          </div>


        </div>
      </div>


    </div>
  );
}
