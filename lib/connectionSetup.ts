import mongoose from 'mongoose'

interface ConnectionStatus {
    isConnected?: number
}

const password = process.env.password
const connection: ConnectionStatus = {}

export const connectToDB = async() => {
    try {
        if(connection.isConnected) return

        const db = await mongoose.connect(`mongodb+srv://simplecodes2580:${password}@cluster0.mxcn9kh.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`)

        connection.isConnected = db.connections[0].readyState

    } catch (error) {
        throw new Error(error as any)
    }
}