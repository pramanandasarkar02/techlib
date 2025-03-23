import express from "express"
import { activateAccount, deactivateAccount, deleteAcoount, getAllActivateUser, getAllDeactivateUser, getAllUser, login, signup, updatePassword, updateProfile } from "../controllers/authController.js";


const authRouter = express.Router()

//  user perspective
authRouter.post("/login", login)
authRouter.post("/signup", signup)
authRouter.put("/update", updateProfile)
authRouter.patch("/update", updatePassword)
authRouter.patch("/activate", activateAccount)
authRouter.patch("/deactivate", deactivateAccount)
authRouter.delete("/delete", deleteAcoount)



//  admin perspective

authRouter.get("/user/all", getAllUser)
authRouter.get("/user/activate", getAllActivateUser)
authRouter.get("/user/deactivate", getAllDeactivateUser)




export default authRouter;