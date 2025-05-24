
import { NextResponse } from "next/server";
import { getAuthenticatedUser } from "@/utils/verifyUser";

import connectDb from "@/utils/connectDb"

import User from "@/utils/model/Users";
import Comment from "@/utils/model/Comment";


export const GET = async (request: Request, {
    params
}: {
    params: Promise<{ manwhaId: string }>
}) => {
    await connectDb()
    const { manwhaId } = await params

    const getAllComments = await Comment.find({ manwhaId }).populate('commenterId', 'username avatar').sort({createdAt: 1});
    return NextResponse.json(getAllComments)
}

export const POST = async (request: Request, {
    params
}: {
    params: Promise<{ manwhaId: string }>
}) => {
    const body = await request.json()
    const { text } = body
    const { manwhaId } = await params

    await connectDb()

    const user = await getAuthenticatedUser()
    if (user?.error) return NextResponse.json('User is not authenticated or invalid token.', { status: 400 })

    const loggedInUser = await User.findById(user._id)

    const newComment = new Comment({
        commenterId: loggedInUser?._id,
        manwhaId,
        text,
    })
    await newComment.save()

    return NextResponse.json(newComment)
}