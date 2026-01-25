const express = require("express")
const router = express.Router()
const busController = require("../controller/busController")

router.post("/buses",busController.addBuses)
router.get("/buses/available/:seat",busController.retrieveBuses)


module.exports = router