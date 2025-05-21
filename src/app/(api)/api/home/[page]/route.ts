import { NextResponse } from "next/server"
import { cookies } from "next/headers"

export const GET = async (request: Request, {
    params
}: {
    params: Promise<{ page: string }>
}) => {

    const cookieStore = await cookies()
    const myCookie = cookieStore.get('mature')

    const mature = myCookie?.value
    
    const { page } = await params
    const res = await fetch(`https://scrapergo.vercel.app/api/manwha/home/${page}/?mature=${mature}`)
    const data = await res.json()

    return NextResponse.json(data)
}