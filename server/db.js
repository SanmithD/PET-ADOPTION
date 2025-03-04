import 'dotenv/config';
import mongoose from "mongoose";

const connectDB = async() =>{
    const URL = process.env.URI
    try {
        const connectToDB = await mongoose.connect(URL);
        console.log(`connect to db ${connectToDB.connection.host}`)
    } catch (error) {
        console.log(error);
    }
}

export default connectDB;