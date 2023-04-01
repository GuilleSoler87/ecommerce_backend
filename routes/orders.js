const express = require("express")
const OrderController = require("../controllers/OrderControler")
const router = express.Router()

router.post("/createOrder", OrderController.create)
router.get("/getAllUsOr", OrderController.getAll)
router.get("/getById/:id", OrderController.getById)
router.delete("/deleteById/:id", OrderController.delete)

module.exports = router;