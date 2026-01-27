const express = require("express")
const router = express.Router()
const busController = require("../controller/busController")

router.post("/addBus",busController.addBus)
router.get("/getBuses",busController.getBuses)
router.get("/getBus/:id",busController.getBus)
router.get("/getBus/available/:limit",busController.getBusWithSeats)
router.put("/updateBus/:id",busController.updateBus)
router.delete("/deleteBus/:id",busController.deleteBus)

module.exports = router