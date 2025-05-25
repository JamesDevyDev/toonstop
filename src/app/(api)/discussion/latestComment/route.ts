import connectDb from "@/utils/connectDb"
import Comment from "@/utils/model/Comment"
import User from "@/utils/model/Users"
import { NextResponse } from "next/server"

export const GET = async (request: Request) => {
    await connectDb()
    try {
        const getAllRecentPost = await Comment.find({})
            .populate('commenterId', 'username avatar')
            .sort({ createdAt: -1 });

        return new Response(JSON.stringify(getAllRecentPost), { status: 200 })
    } catch (error) {
        return new Response('Failed to fetch suggestions', { status: 500 })
    }
}