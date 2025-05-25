import connectDb from '@/utils/connectDb'
import Comment from '@/utils/model/Comment'
import Users from '@/utils/model/Users'  // <-- IMPORTANT: import User here!

export const GET = async () => {
  try {
    await connectDb()

    // Now populate will work because User model is registered
    const comments = await Comment.find({})
      .populate('commenterId', 'username avatar')
      .sort({ createdAt: -1 })

    return new Response(JSON.stringify(comments), { status: 200 })
  } catch (error) {
    console.error("Failed to fetch latest comments:", error)
    return new Response('Failed to fetch latest comments', { status: 500 })
  }
}