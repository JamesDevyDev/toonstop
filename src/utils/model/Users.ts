import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    avatar: {
        type: String,
        default: '/assets/noAvatar.png'
    },
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    likedManwha: [
        {
            manwhaId: String,
            image: String
        }
    ]
}, { timestamps: true })

const User = mongoose.models.User || mongoose.model('User', userSchema)

export default User