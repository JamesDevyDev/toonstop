import mongoose from "mongoose";

const commentSchema = new mongoose.Schema({
    commenterId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Users",
        required: true
    },
    manwhaId: {
        type: String,
        required: true
    },
    text: {
        type: String,
        required: true
    }
}, { timestamps: true })

const Comment = mongoose.models.Comment || mongoose.model('Comment', commentSchema)

export default Comment