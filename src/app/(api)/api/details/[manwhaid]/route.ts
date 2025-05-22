import { NextResponse } from "next/server"

export const GET = async (request: Request, {
    params
}: {
    params: Promise<{ manwhaid: string }>
}) => {
    const { manwhaid } = await params
    const res = await fetch(`https://scrapergo.vercel.app/api/manwha/${manwhaid}`)
    const data = await res.json()

    if (!res.ok) return NextResponse.json('error with fetching details', { status: 400 })

    return NextResponse.json(data.data)
}