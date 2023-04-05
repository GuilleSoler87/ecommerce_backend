const express = require("express")
const OrderController = require("../controllers/OrderControler")
const { authentication, isAdmin } = require("../middleware/authentication")
const router = express.Router()

router.post("/createOrder", OrderController.create)
router.get("/getAllUsOr", OrderController.getAll)
router.get("/getById/:id", OrderController.getById)
router.get("/getAllOrProd", authentication, OrderController.getAll)
router.delete("/deleteById/:id", OrderController.delete)

module.exports = router;