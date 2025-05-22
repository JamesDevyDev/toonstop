import React from 'react'
import useManwhaStore from '@/zustand/useManwhaStore'
import Link from 'next/link'

const HomeCards = () => {

  const { homeData } = useManwhaStore()

  if (!Array.isArray(homeData)) {
    console.log(homeData)
    return <div className="text-white">Loading...</div>;
  }

  return (
    <div className="w-full grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
      {homeData.map((card, index) => (
        <div key={index} className="aspect-[3/5]  w-full rounded-md relative flex-shrink-0 ">

          {card?.status !== '' && (
            <div
              className={`z-[1] text-[12px] px-[2%] py-[1%] rounded-lg absolute font-bold ${card?.status === "HOT"
                  ? "bg-red-500"
                  : card?.status === "NEW"
                    ? "bg-yellow-500"
                    : "bg-gray-500"
                }`}
            >
              {card?.status}
            </div>
          )}


          <Link href={`/details/${card.manwhaId}`}>
            <div className='w-full h-[250px] overflow-hidden rounded-lg group z-[1]'>
              <img src={card.image} className=' w-full h-full group-hover:scale-110  duration-300' />
            </div>
          </Link>
          <div className='w-full  relative flex items-start justify-center flex-col '>

            <Link href={`/details/${card.manwhaId}`} className='truncate w-full'>
              <div className='truncate font-bold py-[10px] text-white rounded-sm  hover:text-[#d7af57]'>{card.title}</div>
            </Link>

            <div className='flex-col flex gap-[5px] w-full'>
              {card.latestEp.map((latestep, index) => (
                <div key={index} className="w-full bg-gray-700/60 p-2 flex justify-between items-center rounded-lg text-white">
                  <Link href={`/chapter/${card.manwhaId}/${latestep.title.split(" ")[1]}`} className='text-[13px] font-bold cursor-pointer hover:text-[#d7af57]'>{latestep.title}</Link>
                  <span className="text-[10px] text-zinc-500">{latestep.date}</span>
                </div>
              ))}
            </div>
          </div>



        </div>
      ))}
    </div >
  )
}

export default HomeCards
