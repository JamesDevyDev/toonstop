import { NextResponse } from "next/server"

export const GET = async (request: Request, {
    params
}: {
    params: Promise<{ manwhaid: string }>
}) => {
    const { manwhaid } = await params
    const res = await fetch(`https://scrapergo.vercel.app/api/manwha/${manwhaid}`)
    const data = await res.json()

    return NextResponse.json(data.data)
}