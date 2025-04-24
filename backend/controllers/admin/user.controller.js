import { getAllUsers } from "../../models/User.js";

async function  getAllUsersController(req, res){
    const users = await getAllUsers();
    res.status(200).json({ users });
}




export {
    getAllUsersController
}