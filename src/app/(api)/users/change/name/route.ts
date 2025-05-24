import { NextResponse } from "next/server"
import connectDb from "@/utils/connectDb"
import { getAuthenticatedUser } from "@/utils/verifyUser"
import User from "@/utils/model/Users"

export const POST = async (request: Request) => {

    await connectDb()

    const body = await request.json()
    const { newName } = body

    const user = await getAuthenticatedUser()
    if (user?.error) return NextResponse.json('User is not authenticated or invalid token.', { status: 400 })

    const loggedInUser = await User.findById(user._id)

    const doesItExist = await User.findOne({ username: newName })
    if (doesItExist) return NextResponse.json("Name is already taken.", { status: 400 })

    loggedInUser.username = newName
    await loggedInUser.save()

    return NextResponse.json(loggedInUser)
}