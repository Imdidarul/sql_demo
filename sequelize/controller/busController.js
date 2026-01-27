const {Op} = require("sequelize")

const Bus = require("../models/bus")

const addBus = async (req,res)=>{
    try {
        const {busNumber,totalSeats,availableSeats} = req.body;

        const bus = await Bus.create({
            busNumber: busNumber,
            totalSeats: totalSeats,
            availableSeats: availableSeats
        });
        console.log("Bus added successfully")
        res.status(200).send("Bus added successfully!")
    } catch (error) {
            res.status(500).send("Unable to add Bus")
    }
}


const getBuses = async (req,res) => {
    try {
        const bus = await Bus.findAll()
        console.log("All Buses fetched")
        res.status(200).json(bus)
    } catch (error) {
        res.status(500).send("Unable to get buses")
    }
}


const getBus = async (req,res) =>{
    try {
        const {id} = req.params

        const bus = await Bus.findByPk(id)
        if (!bus){
            res.status(404).send("Bus not found")
            return
        }
        console.log("Bus fetched")
        res.status(200).json(bus)
    } catch (error) {
        res.status(500).send("Unable to fetch bus")
    }
}



const getBusWithSeats = async(req,res)=>{
    try {
        const {limit} = req.params
        const buses = await Bus.findAll({
            where:{
                availableSeats:{
                    [Op.gt]:Number(limit)
                }
            }
        })

        if(buses.length===0){
            res.status(404).send("No buses found.")
            return
        }

        res.status(200).json(buses)


    } catch (error) {
        res.status(500).send("Unable to fetch bus.")
        return
    }
}


const updateBus = async (req,res)=>{
    try {
        const {id} = req.params
        const {busNumber,totalSeats,availableSeats}= req.body
        const [updatedRows] = await Bus.update(
            {busNumber,totalSeats,availableSeats},
            {where: {id}}
        )

        if (updatedRows === 0){
            res.status(404).send("Bus not found")
            return
        }


        console.log("Bus updated")
        res.status(200).send("Bus updated")
    } catch (error) {
        res.status(500).send("Unable to update Bus")
    }
}


const deleteBus = async (req,res)=>{
    try {
        const {id} = req.params
        const bus = await Bus.destroy({
            where:{
                id:id
            }
        })

        if(!bus){
            res.status(404).send("Bus not found")
            return
        }
        console.log("Bus deleted")
        res.status(200).send("Bus is deleted")
    } catch (error) {
        res.status(500).send("Bus could not be deleted")
    }
}


module.exports = {
    addBus,
    getBuses,
    getBus,
    getBusWithSeats,
    updateBus,
    deleteBus
}