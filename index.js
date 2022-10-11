require("dotenv").config()
const express = require("express")
const cors = require("cors")
const morgan = require("morgan")
const dbConnect = require("./utils/dbConnect")

const app = express()

//middleware
app.use(express.json())
app.use(express.urlencoded({extended:false}))
app.use(cors())
app.use(morgan("dev"))

//routes
const userRouter = require("./routers/user")

app.use("/api/user",userRouter)

app.get("/",(req,res)=>{
    res.send('hello word')
})

//database
dbConnect()

//app initialized
app.listen(process.env.PORT || 8080,()=>{
    console.log(`server is running http://localhost:8080`)
})