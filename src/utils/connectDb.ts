import mongoose from "mongoose"

const connectDb = async () => {
    try {
        await mongoose.connect(process.env.NEXT_MONGO_URL!)
        console.log('connected to database')
    } catch (error) {
        console.log(error)
    }
}

export default connectDb