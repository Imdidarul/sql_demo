const express = require("express")
const app = express()
const studentRoute = require("./routes/studentRoutes")


app.use(express.json())

app.use("/",studentRoute)


db.sync({force:true}).then(()=>{
    app.listen(3000,(err)=>{
        console.log("Server is running!")
    })
}).catch((err)=>[
    console.log(err)
])   