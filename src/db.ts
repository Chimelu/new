import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();

const connectDB = async () => {
  const mongoUri = process.env.DB_URL;
  
  if (!mongoUri) {
    throw new Error('DB_URL is not defined in the environment variables');
  }
  

  try {
    await mongoose.connect(mongoUri);
    console.log('MongoDB connected successfully');
  } catch (error) {
    console.error('MongoDB connection failed:', error);
    process.exit(1); // Exit process with failure
  }
};  


export default connectDB;
