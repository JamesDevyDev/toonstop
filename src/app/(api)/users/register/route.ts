import connectDb from "@/utils/connectDb"
import User from "@/utils/model/Users"
import bcrypt from 'bcrypt'
import { NextResponse } from "next/server"

export const POST = async (request: Request) => {
    await connectDb()

    const body = await request.json()
    const { username, password } = body

    const ifExist = await User.findOne({ username: username })
    if (ifExist) return NextResponse.json("Username already exist.", { status: 400 })


    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt)

    const newUser = new User({ username, password: hashedPassword })
    await newUser.save()

    return NextResponse.json(newUser)
}