import express from "express";
import { login, register, updatePassword } from "../controllers/auth.controller.js";



const authRouter = express.Router();




authRouter.post("/login", login)
authRouter.post("/register", register)
authRouter.put("/update-password", updatePassword)



export default authRouter