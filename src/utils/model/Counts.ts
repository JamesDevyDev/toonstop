import mongoose from "mongoose";

const countSchema = new mongoose.Schema({
    visitCount: {
        type: Number,
        default: 0
    },
    readCount: {
        type: Number,
        default: 0
    }
})

const Count = mongoose.models.Count || mongoose.model('Count', countSchema)

export default Count