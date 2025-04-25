import { getAllUsers, getUserById } from "../../models/User.js";

async function  getAllUsersController(req, res){
    const users = await getAllUsers();
    res.status(200).json({ users });
}


async function getUserByIdController(req, res){
    const { id } = req.params;
    const user = await getUserById(id);
    res.status(200).json({ user });
}



export {
    getAllUsersController,
    getUserByIdController
}