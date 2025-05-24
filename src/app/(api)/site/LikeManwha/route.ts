import { getAuthenticatedUser } from "@/utils/verifyUser"
import { NextResponse } from "next/server"
import connectDb from "@/utils/connectDb"
import User from "@/utils/model/Users"

export const POST = async (request: Request) => {
    await connectDb()

    const body = await request.json()
    const { manwhaId, image } = body

    const user = await getAuthenticatedUser()
    if (user?.error) return NextResponse.json('User is not authenticated or invalid token.', { status: 400 })

    const loggedInUser = await User.findById(user._id)
    const index = loggedInUser.likedManwha.findIndex(
        (item: { manwhaId: string }) => item.manwhaId === manwhaId
    )

    if (index !== -1) {
        loggedInUser.likedManwha.splice(index, 1)
    } else {
        loggedInUser.likedManwha.push({ manwhaId, image })
    }

    await loggedInUser.save()

    return NextResponse.json(loggedInUser.likedManwha)
}