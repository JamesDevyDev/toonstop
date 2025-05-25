import mongoose from "mongoose";

const suggestionSchema = new mongoose.Schema({
    commenterId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    text: {
        type: String,
        required: true
    }
}, { timestamps: true })

const Suggestion = mongoose.models.Suggestion || mongoose.model('Suggestion', suggestionSchema)

export default Suggestion