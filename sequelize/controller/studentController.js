// const db = require("../utils/db_connection")
// const express = require("express")
const Student = require("../models/student")

const addStudent = async (req,res)=>{
    try {
        const {name,email,age} = req.body;

        const student = await Student.create({
            name: name,
            email: email,
            age: age
        });
        console.log("Student added")
        res.status(200).send("Student added successfully!")
    } catch (error) {
            res.status(500).send("Unable to add student")
    }
}



// const addStudent = (req,res)=>{
//     const {name,email,age} = req.body

//     const createQuery = `INSERT INTO student (name,email,age) VALUES (?,?,?)`

//     db.execute(createQuery,[name,email,age],(err)=>{
//         if(err){
//             console.log(err.message)
//             res.status(500).send(err.message)
//             db.end()
//             return
//         }

//         console.log("Student added successfully")
//         res.status(200).send("Student added")
//     })
// }




// const getStudents = (req,res)=>{
//     const getQuery = `SELECT * FROM student`

//     db.execute(getQuery,(err,results)=>{
//         if(err){
//             console.log(err.message)
//             res.status(500).send(err.message)
//             db.end()
//             return
//         }
//         console.log("Retrieved successfully")
//         res.status(200).json(results)
//     })
// }

const getStudents = async (req,res) => {
    try {
        const student = await Student.findAll()
        console.log("All students fetched")
        res.status(200).json(student)
    } catch (error) {
        res.status(500).send("Unable to get students")
    }
}




// const getStudent = (req,res)=>{
//     const {id} = req.params
//     const getQuery = `SELECT name,email,age FROM student WHERE id = ?`

//     db.execute(getQuery,[id],(err,result)=>{
//         if(err){
//             console.log(err.message)
//             res.status(500).send(err.message)
//             db.end()
//             return
//         }
//         console.log("Retrived successfully")
//         res.status(200).json(result)
//     })
// }

const getStudent = async (req,res) =>{
    try {
        const {id} = req.params

        const student = await Student.findByPk(id)
        if (!student){
            res.status(404).send("Student not found")
            return
        }
        console.log("Student fetched")
        res.status(200).json(student)
    } catch (error) {
        res.status(500).send("Unable to fetch student")
    }
}



// const updateStudent = (req,res)=>{
//     const {id} = req.params
//     const {name,email,age} = req.body
//     const updateQuery = `UPDATE student SET name = ?, email = ?, age = ? WHERE id = ?`

//     db.execute(updateQuery,[name,email,age,id],(err,result)=>{
//         if(err){
//             console.log(err.message)
//             res.status(500).send(err.message)
//             db.end()
//             return
//         }

//         if(result.affectedRows===0){
//             console.log("Student not found")
//             res.status(404).send("Student not found")
//         }
//         console.log("Student updated")
//         res.status(200).send("Student updated successfully")
//     })
// }


const updateStudent = async (req,res)=>{
    try {
        const {id} = req.params
        const {name,email,age}= req.body
        // const student = await Student.findByPk(id)
        const [updatedRows] = await Student.update(
            {name,email,age},
            {where: {id}}
        )

        if (updatedRows === 0){
            res.status(404).send("Student not found")
            return
        }


        console.log("User updated")
        res.status(200).send("User updated")
    } catch (error) {
        res.status(500).send("Unable to update user")
    }
}




// const deleteStudent = (req,res)=>{
//     const {id} = req.params
//     const deleteQuery = `DELETE FROM student WHERE id = ?`

//     db.execute(deleteQuery,[id],(err,result)=>{
//         if(err){
//             console.log(err.message)
//             res.status(500).send(err.message)
//             db.end()
//             return
//         }
//         if (result.affectedRows === 0){
//             console.log("Student not found")
//             res.status(404).send("Student not found")
//         }
//         console.log("Student deleted successfully")
//         res.status(200).send("Student deleted successfully")
// })
// }


const deleteStudent = async (req,res)=>{
    try {
        const {id} = req.params
        const student = await Student.destroy({
            where:{
                id:id
            }
        })

        if(!student){
            res.status(404).send("User not found")
            return
        }
        console.log("User deleted")
        res.status(200).send("User is deleted")
    } catch (error) {
        res.status(500).send("Student not deleted")
    }
}




module.exports = {
    addStudent,
    getStudents,
    getStudent,
    updateStudent,
    deleteStudent
}