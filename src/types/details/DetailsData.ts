export interface DetailsData {
    title: string
    image: string
    info: DetailsInfo[] 
    summary: string
    chapterCount: number 
    chapters: ChapterData[] 
}

export interface DetailsInfo {
    "Alt Name": any
    Author: any
    Artist: any
    Genre: any[]
}

export interface ChapterData {
    name: string
    releaseDate: string
    chapterId: string
}
