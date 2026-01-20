const express = require("express");
const mysql = require("mysql2");
const app = express()

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '********',
    database: 'testDb'
})

connection.connect((err)=>{
    if(err){
    console.log(err);
    }
    console.log("Connection made successfully");

    const creationQuery = `create table Students(
        id int AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(20),
        email VARCHAR(20)
    )`

    connection.execute(creationQuery,(err)=>{
        if(err){
            console.log(err)
        }
        console.log("Table is created")
    })
});

app.get("/",(req,res)=>{
    res.send("Hello world")
})


app.listen(3000, (err)=>{
    if (err){
        console.log(err)
    }
    console.log("Server running")
})

