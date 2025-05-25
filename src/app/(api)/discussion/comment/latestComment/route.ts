import connectDb from "@/utils/connectDb"
import Comment from "@/utils/model/Comment"
import { NextResponse } from "next/server"

export const GET = async () => {
    await connectDb()

    const getAllRecentPost = await Comment.find({}).populate('commenterId', 'username avatar').sort({ createdAt: -1 });

    if(!getAllRecentPost) return NextResponse.json('error bro')

    return NextResponse.json(getAllRecentPost)
}