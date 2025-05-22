import { NextResponse } from "next/server"

export const GET = async (request: Request, {
    params
}: {
    params: Promise<{ manwhaid: string, chapter: string }>
}) => {
    const { manwhaid, chapter } = await params
    const res = await fetch(` https://scrapergo.vercel.app/api/manwha/${manwhaid}/${chapter}`)
    const data = await res.json()
    if (!res.ok) return NextResponse.json('error with fetching chapters', { status: 400 })

    return NextResponse.json(data.data)
}