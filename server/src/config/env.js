import dotenv from "dotenv";

dotenv.config();

export const {
  MONGODB_URL,
  PORT,
  JWT_SECRET,
} = process.env;