import mongoose from "mongoose";

const connectDB = async () => {
  try {
    console.log(`MongoDB url: ${process.env.MONGODB_URI}`);
    
    const conn = await mongoose.connect(process.env.MONGODB_URI);
    console.log(`MongoDB Connected: ${conn.connection.host}`);
    
    console.log(`Database: ${conn.connection.name}`);

    console.log("MongoDB Connected Successfully");
  } catch (error) {
    console.error(error.message || "MongoDB Connection Failed");
    process.exit(1);
    // throw error;
  }
};

export default connectDB;