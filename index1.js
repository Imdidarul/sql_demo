const express = require("express");
const mysql = require("mysql2");
const app = express()

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '04082002@Didar',
    database: 'testDb'
})

connection.connect((err)=>{
    if(err){
    return console.log(err);
    }
    console.log("Connection made successfully");

    const createUsers = `create table Users(
        id int AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(20),
        email VARCHAR(20)
    )`
    const createBuses = `create table Buses(
        id int AUTO_INCREMENT PRIMARY KEY,
        busNumber int,
        totalSeats int,
        availableSeats int
    )`
    const createBookings = `create table Bookings(
        id int AUTO_INCREMENT PRIMARY KEY,
        seatNumber int
    )`
    const createPayments = `create table Payments(
        id int AUTO_INCREMENT PRIMARY KEY,
        amountPaid int,
        paymentStatus varchar(20)
    )`

    connection.execute(createUsers,(err)=>{
        if(err){
            return console.log(err)
        }
        connection.execute(createBuses,(err)=>{
            if(err){
                return console.log(err)
            }
            connection.execute(createBookings,(err)=>{
                if(err){
                    return console.log(err)
                }
                connection.execute(createPayments,(err)=>{
                    if(err){
                        return console.log(err)
                    }
                    console.log("All tables created successfully")
                })
            })
        })
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

