import { User } from "../models/user.model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../config/env.js";

async function register(req, res) {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({
        message: "Missing required fields: name, email, or password",
      });
    }

    const isUserExist = await User.findOne({ email });

    if (isUserExist) {
      return res.status(409).json({
        message: "Email is already registered",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await User.create({
      name,
      email,
      password: hashedPassword,
    });

    res.status(201).json({
      message: "User registration successful",
    });
  } catch (error) {
    console.error(`Error while registering user: ${error.message}`);
    res.status(500).json({
      message: "Failed to create user account",
    });
  }
}

async function login(req, res) {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({
        message: "Email and password are required",
      });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({
        message: "Invalid email or password",
      });
    }

    const isPasswordMatch = await bcrypt.compare(password, user.password);
    if (!isPasswordMatch) {
      return res.status(401).json({
        message: "Invalid email or password",
      });
    }

    const token = jwt.sign(
      {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
      JWT_SECRET,
      { expiresIn: "7d" }
    );

    res
      .status(200)
      .cookie("token", token, {
        httpOnly: true,
        secure: true,
        sameSite: "strict",
        maxAge: 7 * 24 * 60 * 60 * 1000,
      })
      .json({
        message: "User logged in successfully",
        user: {
          id: user._id,
          name: user.name,
          email: user.email,
          role: user.role,
        },
      });
  } catch (error) {
    console.error(`Error while login user: ${error.message}`);
    res.status(500).json({
      message: "Authentication failed",
    });
  }
}

async function logout(req, res) {
  try {
    res.clearCookie("token");

    res.status(200).json({
      message: "User logged out successfully",
    })
  } catch (error) {
    console.error(`Error while logout user: ${error.message}`);
    res.status(500).json({
      message: "Logout failed",
    });
  }
}

export { register, login, logout };
