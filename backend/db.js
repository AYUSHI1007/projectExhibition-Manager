import mongoose from 'mongoose';

const connectDB = async () => {
  try {
    const conn = await mongoose.connect('mongodb://127.0.0.1:27017/mentor-meet-space');
    console.log(`✅ MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
    process.exit(1);
  }
};

export default connectDB;
