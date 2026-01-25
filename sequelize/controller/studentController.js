const db = require("../utils/db_connection")
const express = require("express")

const addStudent = (req,res)=>{
    const {name,email,age} = req.body

    const createQuery = `INSERT INTO student (name,email,age) VALUES (?,?,?)`

    db.execute(createQuery,[name,email,age],(err)=>{
        if(err){
            console.log(err.message)
            res.status(500).send(err.message)
            db.end()
            return
        }

        console.log("Student added successfully")
        res.status(200).send("Student added")
    })
}


const getStudents = (req,res)=>{
    const getQuery = `SELECT * FROM student`

    db.execute(getQuery,(err,results)=>{
        if(err){
            console.log(err.message)
            res.status(500).send(err.message)
            db.end()
            return
        }
        console.log("Retrieved successfully")
        res.status(200).json(results)
    })
}

const getStudent = (req,res)=>{
    const {id} = req.params
    const getQuery = `SELECT name,email,age FROM student WHERE id = ?`

    db.execute(getQuery,[id],(err,result)=>{
        if(err){
            console.log(err.message)
            res.status(500).send(err.message)
            db.end()
            return
        }
        console.log("Retrived successfully")
        res.status(200).json(result)
    })
}

const updateStudent = (req,res)=>{
    const {id} = req.params
    const {name,email,age} = req.body
    const updateQuery = `UPDATE student SET name = ?, email = ?, age = ? WHERE id = ?`

    db.execute(updateQuery,[name,email,age,id],(err,result)=>{
        if(err){
            console.log(err.message)
            res.status(500).send(err.message)
            db.end()
            return
        }

        if(result.affectedRows===0){
            console.log("Student not found")
            res.status(404).send("Student not found")
        }
        console.log("Student updated")
        res.status(200).send("Student updated successfully")
    })
}


const deleteStudent = (req,res)=>{
    const {id} = req.params
    const deleteQuery = `DELETE FROM student WHERE id = ?`

    db.execute(deleteQuery,[id],(err,result)=>{
        if(err){
            console.log(err.message)
            res.status(500).send(err.message)
            db.end()
            return
        }
        if (result.affectedRows === 0){
            console.log("Student not found")
            res.status(404).send("Student not found")
        }
        console.log("Student deleted successfully")
        res.status(200).send("Student deleted successfully")
})
}


module.exports = {
    addStudent,
    getStudents,
    getStudent,
    updateStudent,
    deleteStudent
}