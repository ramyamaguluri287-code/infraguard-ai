import mongoose from 'mongoose';

export async function connectDB() {
  try {
    const conn = await mongoose.connect(
      process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/infraguard'
    );
    console.log(`[Database] MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.warn(`[Database Notice] MongoDB connection failed: ${error.message}. Running in memory fallback mode.`);
  }
}
