const express = require('express')
const app = express()
const cors = require("cors")

const userRouter = require("./routers/user.router")
const instructorRouter = require("./routers/instructor.router")
const adminRouter = require("./routers/admin.router")
app.use(express.json())
app.use(express.urlencoded({extended:true}))

app.use(cors({
    origin: 'http://localhost:5175', // Frontend URL
    methods: ['GET', 'POST'],
    credentials: true,
  }));

app.use('/user', userRouter)
// app.use('/instructor', instructorRouter)
app.use("/admin", adminRouter)

module.exports = app;



