const express = require("express")
const app = express()
const db = require("./utils/db_connection")
const studentRoute = require("./routes/studentRoutes")
const busRoute = require("./routes/busRoutes")
const studentModel = require("./models/student")

app.use(express.json())

app.use("/student",studentRoute)
app.use("/bus",busRoute)

db.sync({force:true}).then(()=>{
    app.listen(3000,(err)=>{
        console.log("Server is running!")
    })
}).catch((err)=>[
    console.log(err)
])   