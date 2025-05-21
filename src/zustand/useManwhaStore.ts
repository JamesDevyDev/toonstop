import { create } from 'zustand'
import { HomeData } from '@/types/home/HomeData'
import { DetailsData } from '@/types/details/DetailsData'
import { ChapterData } from '@/types/chapter/ChapterData'

interface ManwhaStore {
    homeData: HomeData[],
    getHomeData: ({ page }: { page: string }) => Promise<any>

    detailsData: DetailsData | null,
    getDetailsData: ({ manwhaid }: { manwhaid: string }) => Promise<any>

    chapterData: ChapterData | null,
    getChapterData: ({ manwhaid, page }: { manwhaid: string, page: string }) => Promise<any>
}

const useManwhaStore = create<ManwhaStore>((set, get) => ({
    homeData: [],
    getHomeData: async ({ page }: { page: String }) => {
        try {
            const res = await fetch(`/api/home/${page}`)
            const data = await res.json()
            set({ homeData: data })

        } catch (error) {
            console.log(error)
            return null
        }
    },
    detailsData: null,
    getDetailsData: async ({ manwhaid }: { manwhaid: String }) => {
        try {
            const res = await fetch(`/api/details/${manwhaid}`)
            const data = await res.json()
            set({ detailsData: data })

            return data

        } catch (error) {
            console.log(error)
            return null
        }
    },
    chapterData: null,
    getChapterData: async ({ manwhaid, page }: { manwhaid: String, page: String }) => {
        try {
            const res = await fetch(`/api/chapter/${manwhaid}/${page}`)
            const data = await res.json()
            set({ chapterData: data })


        } catch (error) {
            console.log(error)
            return null
        }
    }


}))

export default useManwhaStore