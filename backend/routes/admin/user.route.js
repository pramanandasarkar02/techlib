import express from 'express'
import { getAllUsersController, getUserByIdController } from '../../controllers/admin/user.controller.js';



const adminUserRouter = express.Router()




adminUserRouter.get("/", getAllUsersController);
adminUserRouter.get("/:id", getUserByIdController);


export default adminUserRouter

