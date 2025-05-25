import connectDb from '@/utils/connectDb'
import '@/utils/model/Users' // ⬅️ Important: import this to register the model
import Comment from '@/utils/model/Comments'


export const GET = async (request: Request) => {
    await connectDb()

    try {
        const comments = await Comment.find({})
            .populate('commenterId', 'username avatar') // optional, if you want user info
            .sort({ createdAt: -1 })

        return new Response(JSON.stringify(comments), { status: 200 })
    } catch (error) {
        return new Response('Failed to fetch Comment', { status: 500 })
    }
}