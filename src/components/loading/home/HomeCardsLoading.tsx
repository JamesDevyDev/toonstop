import React from 'react'

const HomeCardsLoading = () => {
    const placeholders = Array.from({ length: 24 })

    return (
        <div className="w-full grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
            {placeholders.map((_, index) => (
                <div key={index} className="skeleton bg-gray-800 h-[250px] aspect-[3/5] w-full rounded-md relative ">
                
                </div>
            ))}
        </div>
    )
}

export default HomeCardsLoading
