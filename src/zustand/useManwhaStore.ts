import { create } from 'zustand'
import { HomeData } from '@/types/home/HomeData'
import { DetailsData } from '@/types/details/DetailsData'
import { ChapterData } from '@/types/chapter/ChapterData'

interface ManwhaStore {
    mature: number,
    setMature: (value: 0 | 1) => void

    pagination: number[] | null,

    homeData: HomeData[],
    getHomeData: ({ page }: { page: string }) => Promise<any>

    detailsData: DetailsData | null,
    getDetailsData: ({ manwhaid }: { manwhaid: string }) => Promise<any>

    chapterData: ChapterData | null,
    getChapterData: ({ manwhaid, page }: { manwhaid: string, page: string }) => Promise<any>


    // For sites count
    visitCount: number,
    getVisitCount: () => void,
    readCount: number,
    getReadCount: () => void
}

const useManwhaStore = create<ManwhaStore>((set, get) => ({
    mature: 0,
    setMature: (value) => set({ mature: value }),

    pagination: [],

    homeData: [],
    getHomeData: async ({ page }: { page: string }) => {

        try {
            const res = await fetch(`/api/home/${page}`)
            const data = await res.json()
            if (!res.ok) {
                console.log('Home Not Found.');
                return { error: true };
            }

            set({ pagination: data.pagination })
            set({ homeData: data.data })

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
            if (!res.ok) {
                console.log('Details Not Found.');
                return { error: true };
            }

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
            if (!res.ok) {
                console.log('Chapters Not Found.');
                return { error: true };
            }

            set({ chapterData: data })
            return data

        } catch (error) {
            console.log(error)
            return null
        }
    },

    // For sites count
    visitCount: 0,
    getVisitCount: async () => {
        let res = await fetch('/site/count/visit')
        if (!res.ok) throw new Error("Failed to fetch visit count");
        let data = await res.json()
        console.log(data)
        set({ visitCount: data })
    },
    readCount: 0,
    getReadCount: async () => {
        let res = await fetch('/site/count/read')
        if (!res.ok) throw new Error("Failed to fetch read count");
        let data = await res.json()
        console.log(data)
        set({ readCount: data })
    },


}))

export default useManwhaStore