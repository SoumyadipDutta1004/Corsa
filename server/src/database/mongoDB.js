import mongoose from "mongoose";
import { MONGODB_URL } from "../config/env.js";

if (!MONGODB_URL) {
  throw new Error("MONGODB_URL is not defined");
}

async function connectToDB() {
  if (mongoose.connection.readyState === 1) {
    console.log("Database is already connected");
    return;
  }
  try {
    await mongoose.connect(MONGODB_URL);
    console.log("Connected to MongoDB");
  } catch (error) {
    console.error("Error connecting to MongoDB");
    throw error;
  }
}

export default connectToDB;