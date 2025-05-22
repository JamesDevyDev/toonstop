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
    const url = `https://scrapergo.vercel.app/api/manwha/home/${page}?mature=${mature}`

    const res = await fetch(url)
    const data = await res.json()
    if (!res.ok) return NextResponse.json('error with fetching home', { status: 400 })


    return NextResponse.json(data)
}