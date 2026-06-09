import mongoose from "mongoose";

export async function connectDB(): Promise<void> {
  const uri = process.env.MONGODB_URI;

  if (!uri) {
    throw new Error("MONGODB_URI is not defined in your .env file");
  }

  try {
    await mongoose.connect(uri);
    console.log("MongoDB connected ✓");
  } catch (error) {
    console.error("MongoDB connection failed:", (error as Error).message);
    process.exit(1);
  }
}
