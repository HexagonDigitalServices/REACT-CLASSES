import mongoose from "mongoose";

export const connectDB = async () => {
    await mongoose.connect('<your_mongodb_connection_string>')
        .then(() => console.log("DB CONNECTED"));
}