import express from "express"
import { login, signup } from "../controller/auth.controller";



const router = express.Router();


router.get("/signup", signup)

router.get("/login", login)

router.get("/logout", (req, res) => {
  res.send("Logout endpoint");
})


export default router