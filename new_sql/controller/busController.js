const db = require("../utils/db_connection")


const addBuses = (req,res)=>{
    const {bus_number, total_seats,available_seats} = req.body;

    const insertQuery = `INSERT INTO bus (bus_number,total_seats,available_seats) VALUES (?,?,?)`

    db.execute(insertQuery, [bus_number,total_seats,available_seats],(err)=>{
        if(err){
            console.log(err.message)
            res.status(500).send(err.message)
            db.end()
            return
        }
        console.log("Value inserted into bus table")
        res.status(200).send(`Bus is added successfully`)
    })
}

const retrieveBuses = (req,res)=>{
    const seat = Number(req.params.seat)
    console.log(`Seat Recieved: ${seat}`)

    const retrieveQuery = `SELECT bus_number,total_seats,available_seats FROM bus WHERE available_seats>=?`

    db.execute(retrieveQuery,[seat],(err,results)=>{
        if(err){
            console.log(err.message)
            res.status(500).send(err.message)
            db.end()
            return
        }

        console.log("Buses retrieved successfully")
        res.status(200).json(results)
    })

}



module.exports = {
    addBuses,
    retrieveBuses
}