const db = require("../utils/db_connection")

const addEntries = (req,res)=>{
    const {email,name} = req.body;
    const insertQuery = `INSERT INTO students (email,name) VALUES (?,?)`

    db.execute(insertQuery,[email,name], (err)=>{
        if(err){
            console.log(err.message)
            db.end()
            return
        }
        console.log("value inserted in students table")
        res.status(200).send(`Student ${name} is added succesfully`)
})
}


const updateEntry = (req,res)=>{
    const {id} = req.params;
    const {name,email} = req.body
    // const {email} = req.body

    const updateQuery = `UPDATE students set name = ?, email = ? WHERE id = ?`


    db.execute(updateQuery, [name,email,id], (err,result)=>{
        if(err){
            console.log(err.message)
            res.status(500).send(err.message)
            db.end()
            return
        }
        if(result.affectedRows===0){
            res.status(404).send("Student not found")
            return
        }
        console.log(`User ${id} updated`)
        res.status(200).send("Updated")
})
}


const deleteEntry = (req,res)=>{
    const {id} = req.params
    // const {name,email} = req.body
    // const {email} = req.body

    const deleteQuery = `DELETE FROM students WHERE id = ?`

    db.execute(deleteQuery,[id],(err,results)=>{
        if(err){
            console.log(err.message)
            res.status(500).send(err.message)
            return
        }

        if(results.affectedRows===0){
            res.status(404).send("Student not found")
            return
        }

        console.log(`User ${id} deleted`)
        res.status(200).send(`User ${id} deleted`)
    })
}



const getEntries = (req,res)=>{
    const getQuery = `SELECT * FROM STUDENTS`

    db.execute(getQuery,(err,results)=>{
        if(err){
            console.log(err.message)
            res.status(500).send(err.message)
            return
        }

        console.log("Users are displayed")
        res.status(200).json(results)
    })
}


module.exports = {
    addEntries,
    updateEntry,
    deleteEntry,
    getEntries
}