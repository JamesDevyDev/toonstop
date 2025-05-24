import { NextResponse } from "next/server"
import connectDb from "@/utils/connectDb"
import { getAuthenticatedUser } from "@/utils/verifyUser"
import User from "@/utils/model/Users"
import bcrypt from 'bcrypt'

export const POST = async (request: Request) => {
    await connectDb()

    const body = await request.json()
    const { currentPassword, newPassword } = body

    const user = await getAuthenticatedUser()
    if (user?.error) {
        return NextResponse.json('User is not authenticated or invalid token.', { status: 400 })
    }

    const loggedInUser = await User.findById(user._id)

    const isPasswordCorrect = await bcrypt.compare(currentPassword, loggedInUser.password)
    if (!isPasswordCorrect) {
        return NextResponse.json("Incorrect password.", { status: 400 })
    }

    if (newPassword.length < 6) {
        return NextResponse.json("Password must be at least 6 characters long.", { status: 400 })
    }

    const salt = await bcrypt.genSalt(10)
    const hashPassword = await bcrypt.hash(newPassword, salt)

    loggedInUser.password = hashPassword

    await loggedInUser.save()

    return NextResponse.json({ message: "Password updated successfully." })
}
