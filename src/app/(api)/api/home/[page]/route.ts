import { NextResponse } from "next/server"

export const GET = async (request: Request, {
    params
}: {
    params: Promise<{ page: string }>
}) => {
    const { page } = await params
    const res = await fetch(`https://scrapergo.vercel.app/api/manwha/home/${page}`)
    const data = await res.json()

    return NextResponse.json(data.data)
}