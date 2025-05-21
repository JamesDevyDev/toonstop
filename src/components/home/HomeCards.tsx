import React from 'react'
import useManwhaStore from '@/zustand/useManwhaStore'
import Link from 'next/link'

const HomeCards = () => {

  const { homeData } = useManwhaStore()

  return (
    <div className="w-full grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
      {homeData.map((card, index) => (
        <div key={index} className="aspect-[3/5]  w-full rounded-md relative flex-shrink-0 ">
          <Link href={`/details/${card.manwhaId}`}>
            <div className='w-full h-[250px] overflow-hidden rounded-lg group'>
              <img src={card.image} className='w-full h-full group-hover:scale-110  duration-300' />
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

// < Link href = {`/chapter/${manwhaid}/${chapter?.chapterId}`} key = { index } className = 'rounded-lg overflow-hidden' >
//                           <div className='w-full h-[60px] flex items-center flex-col justify-center relative group'>
//                               <div className='font-bold group-hover:text-[#d7af57]'>{chapter?.name}</div>
//                               <span className='text-[12px] text-zinc-500'>{chapter?.releaseDate}</span>
//                           </div>
//                           <div className='w-full bg-[#d7af57] h-[3px]'></div>
//                       </Link >