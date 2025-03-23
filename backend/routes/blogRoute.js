import express from "express"
import { add, comment, dislike, getAllBlogs, getBlog, like, shear, update } from "../controllers/blogController.js"



const blogRouter = express.Router()


blogRouter.post("/new", add)
blogRouter.put("/update", update)
blogRouter.patch("/like", like)
blogRouter.patch("/dislike", dislike)
blogRouter.get('/shear', shear)
blogRouter.post("/comment", comment)
blogRouter.get("/blogs", getBlog)



// admin
blogRouter.get("/blogs/all", getAllBlogs)




export default blogRouter