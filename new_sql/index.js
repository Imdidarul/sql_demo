const express = require("express")
const app = express()
const db = require("./utils/db_connection")
const studentRoutes = require("./routes/studentsRoutes")
const busRoutes = require("./routes/busRoutes")

app.use(express.json())

app.get('/',(req,res)=>{
    res.send("Hello world")
})

app.use("/students",studentRoutes)
app.use("/bus",busRoutes)


app.listen(3000,(err)=>{
    console.log("Server is running")
})