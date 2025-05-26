import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../config/env.js";
import { User } from "../models/user.model.js";

async function adminMiddleware(req, res, next) {
  try {
    const token = req.cookies.token;
    if (!token) {
      return res.status(401).json({
        message: "Unauthorized - No token provided",
      });
    }

    let decoded;
    try {
      decoded = jwt.verify(token, JWT_SECRET);
    } catch (jwtError) {
      return res.status(401).json({
        message: "Unauthorized - Invalid or tempered token",
      });
    }

    const user = await User.findOne({ 
      _id: decoded.id,
    }).select("-password").select("+role");

    if (!user) {
      return res.status(401).json({
        message: "Unauthorized - Invalid token",
      });
    }
    if (user.role !== "admin") {
      return res.status(403).json({
        message: "Admin access required",
      });
    }

    req.user = user;
    next();
  } catch (error) {
    console.error(`Error in admin middleware: ${error.message}`);
    res.status(500).json({
      message: "Internal Server Error",
    });
  }
}

export default adminMiddleware;
