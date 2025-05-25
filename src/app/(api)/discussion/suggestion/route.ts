import { NextResponse } from "next/server"
import { getAuthenticatedUser } from "@/utils/verifyUser"

import connectDb from "@/utils/connectDb"
import Users from "@/utils/model/Users"
import Suggestion from "@/utils/model/Suggestions"

export const GET = async (request: Request) => {
    await connectDb()

    try {
        const suggestions = await Suggestion.find({})
            .populate('commenterId', 'username avatar') // optional, if you want user info
            .sort({ createdAt: -1 })

        return new Response(JSON.stringify(suggestions), { status: 200 })
    } catch (error) {
        return new Response('Failed to fetch suggestions', { status: 500 })
    }
}

export const POST = async (request: Request) => {
    await connectDb()

    const body = await request.json()
    let { text } = body

    const user = await getAuthenticatedUser()
    if (user?.error)
        return NextResponse.json('User is not authenticated or invalid token.', { status: 400 })

    const loggedInUser = await Users.findById(user._id)
    if (!loggedInUser)
        return NextResponse.json('User not found.', { status: 404 })

    text = text.trim()

    if (!text || text.length > 200) {
        return NextResponse.json('Suggestion must be between 1 and 200 characters.', { status: 400 })
    }

    // Sanitize text: remove HTML tags (e.g. <script>)
    text = text.replace(/<[^>]*>?/gm, '')

    const newSuggestion = new Suggestion({
        commenterId: loggedInUser._id,
        text,
    })
    await newSuggestion.save()

    return NextResponse.json(newSuggestion)
}
