import mongoose from "mongoose";
import colors from "colors"
import 'dotenv/config'

export const connectToDB = async ()=>{
    try {
        await mongoose.connect(process.env.MONGO_URL);
        console.log("---Data base connect---".bgMagenta)
    } catch (error) {
        console.log(`${error}`.bgRed);
    }
}