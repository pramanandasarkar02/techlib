import express from "express"
import 'dotenv/config'
import cors from "cors"

import authRouter from "./routes/authRoute.js"
import searchRouter from "./routes/searchRoute.js"
import docRouter from "./routes/docRoute.js"
import connectionRoute from "./routes/connectionRoute.js"
import blogRouter from "./routes/blogRoute.js"




const app = express()
const port = process.env.PORT || 4041


app.use(express.json())
app.use(cors())






app.use("/api/auth", authRouter)
app.use("/api/search", searchRouter)
app.use("/api/doc", docRouter)
app.use("/api/blog", blogRouter)
app.use("/api/connection", connectionRoute)






app.listen(port, ()=>{
    console.log(`server started ar http://localhost:${port}`)
})



