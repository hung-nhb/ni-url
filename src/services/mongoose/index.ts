import { connect } from "mongoose"

const connectMongoDB = async () => {
    try {
        await connect(process.env.MONGODB_URL || "")
    }
    catch (error) {
        throw error
    }
}

export default connectMongoDB