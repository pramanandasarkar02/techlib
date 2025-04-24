import express from 'express'
import { getAllUsersController } from '../../controllers/admin/user.controller.js';



const adminUserRouter = express.Router()




adminUserRouter.get("/", getAllUsersController);


export default adminUserRouter

