import bcrypt from "bcryptjs";
import { User } from "../models/user.model.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import jwt from "jsonwebtoken";

export const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password)
      return res.status(400).json({
        message: "All fields are required",
      });

    const existingUser = await User.findOne({ email });
    if (existingUser)
      return res.status(409).json({
        message: "Email already exists",
      });

    const imageLocalPath = req.file?.path;
    if (!imageLocalPath)
      return res.status(400).json({
        message: "Profile image is required",
      });

    const hashedPassword = await bcrypt.hash(password, 10);

    const imageUploadResult = await uploadOnCloudinary(imageLocalPath);
    if (!imageUploadResult)
      return res.status(500).json({
        message: "Image upload failed",
      });

    console.log("Saving user:", {
      name,
      email,
      profileImage: imageUploadResult.url,
    });

    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      profileImage: imageUploadResult.url,
    });

    const createdUser = await User.findById(user._id).select("-password");
    return res.status(201).json({
      message: "Registered successfully",
      data: createdUser,
    });
  } catch (error) {
    console.log("SERVER CRASHED AT:", error.message);
    return res.status(500).json({
      message: error.message,
    });
  }
};

export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (!user || !(await user.isPasswordCorrect(password))) {
      return res.status(401).json({
        message: "Invalid credentials",
      });
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });
    const loggedInUser = await User.findById(user._id).select("-password");

    return res.status(200).json({
      message: "Login successful",
      token,
      user: loggedInUser,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Login process failed",
    });
  }
};

export const getUserProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    if (!user)
      return res.status(404).json({
        message: "User not found",
      });
    return res.status(200).json({
      data: user,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Error fetching profile",
    });
  }
};
