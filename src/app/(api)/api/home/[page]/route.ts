import { NextResponse } from "next/server"

export const GET = async (request: Request, {
    params
}: {
    params: Promise<{ page: string }>
}) => {

    const url = new URL(request.url)
    const mature = url.searchParams.get('mature') 
    
    const { page } = await params
    const res = await fetch(`https://scrapergo.vercel.app/api/manwha/home/${page}/?mature=${mature}`)
    const data = await res.json()

    return NextResponse.json(data)
}