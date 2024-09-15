import mongoose from "mongoose";

const connectDB = async () => {
    try {
        console.log(`🔥🤬:${process.env.MONGODB_URI}`)
        await mongoose.connect(process.env.MONGODB_URI!)
        console.log("MongoDB connected")
    } catch (error) {
        console.log(error)
        throw new Error()
    }
}

export default connectDB