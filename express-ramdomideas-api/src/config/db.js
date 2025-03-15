import mongoose from 'mongoose'

const connectionDatabase = async () => {
    const conn = await mongoose.connect(process.env.MONGO_URL)
    console.log(`MongoDB connected: ${conn.connection.host}`)
}

mongoose.set('strictQuery', true)

export { connectionDatabase }