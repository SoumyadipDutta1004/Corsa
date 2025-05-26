import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";


import {
  authRoute,
  userRoute,
  courseRoute,
} from "./routes/index.js";

import connectToDB from "./database/mongoDB.js";
import { PORT } from "./config/env.js";

const app = express();

// Middlewares
app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true
}));
app.use(express.json());
app.use(cookieParser());

// Routes
app.use("/api/v1/auth", authRoute);
app.use("/api/v1/user", userRoute);
app.use("/api/v1/courses", courseRoute);

(async () => {
  await connectToDB();

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server is running on port http://localhost:${PORT}`);
  });
})();
