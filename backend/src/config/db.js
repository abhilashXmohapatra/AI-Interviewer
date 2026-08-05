import mongoose from 'mongoose';


export const connectDB = async () => {
  try {
    const mongoUri = process.env.MONGO_URI;
    const conn = await mongoose.connect(mongoUri);
    console.log(`db Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`db Error: ${error.message}`);
    process.exit(1);
  }
};

export default connectDB;
