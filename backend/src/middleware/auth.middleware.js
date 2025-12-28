import jwt from "jsonwebtoken"
import User from "../models/User.js"
import dotenv from "dotenv"


dotenv.config();
const secret = process.env.JWT_SECRET

export const protectRoute = async (req, res, next) => {
  try {
    const token = req.cookies.jwt
    if(!token) return res.status(401).json({message: "no token provided"})
    
    const decoded = jwt.verify(token, secret)
    if(!decoded) return res.status(401).json({message: "no token provided"})
    
    const user = await User.findById(decoded.userId)
    if (!user) return res.status(401).json({message: "no token provided"})

    req.user = user
    
    next()
  } catch (error) {
    console.log("Error in protectRoute middleware", error)
    res.status(500).json({message: "Internal server error!"})

  }

}